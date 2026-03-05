import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { SessionService } from '../../services/session';
import { WebAuthnService } from '../../services/webauthn';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin implements OnInit {

  email = '';
  password = '';
  role: string = 'student';

  passkeyLoading = false;
  passkeyError = '';
  loginMessage = '';
  apiErrorMessage = '';

  /** Compte bloqué après 3 tentatives (status 423). */
  accountLocked = false;
  /** Clic sur "Débloquer avec PIN" : PIN envoyé par email, afficher champ PIN. */
  unblockPinSent = false;
  unblockPin = '';
  unblockPinError = '';
  unblockPinLoading = false;
  /** PIN validé : afficher "PIN valide" + liens Reset password / Home. */
  unblockSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private session: SessionService,
    private webAuthn: WebAuthnService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const r = (params['role'] || '').toString().toLowerCase();
      const allowed = ['student', 'candidate', 'admin', 'tutor'];
      this.role = allowed.includes(r) ? r : 'student';
      this.loginMessage = (params['message'] || '').toString();
    });
  }

  // ✅ deviceId (persistant) + cookie DEVICE_ID (pour OAuth2)
  private getOrCreateDeviceId(): string {
    const key = 'deviceId';
    let deviceId = localStorage.getItem(key);
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(key, deviceId);
    }
    return deviceId;
  }

  private setDeviceIdCookie(deviceId: string) {
    document.cookie = `DEVICE_ID=${encodeURIComponent(deviceId)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  onLogin(form?: { valid?: boolean | null }) {
    if (form != null && form.valid !== true) return;

    this.apiErrorMessage = '';
    const deviceId = this.getOrCreateDeviceId();

    const data: any = {
      email: this.email,
      password: this.password,
      role: (this.role || '').toUpperCase(),

      deviceId,
      userAgent: navigator.userAgent,
      platform: (navigator as any).platform || '',
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    };

    this.authService.login(data).subscribe({
      next: (response: any) => {
        this.afterAuthSuccess(response);
      },
      error: (error) => {

        // ✅ NOUVEAU FORMAT backend: { pending:true, token:"..." }
        if (error?.status === 403 && error?.error?.pending === true && error?.error?.token) {
          this.router.navigate(['/auth/device-pending'], {
            queryParams: { token: error.error.token }
          });
          return;
        }

        // (optionnel) compat ancien code si jamais
        if (error?.status === 403 && error?.error?.code === 'DEVICE_CONFIRM_REQUIRED') {
          this.router.navigate(['/auth/device-pending']);
          return;
        }

        // Compte bloqué après 3 tentatives (15 min)
        if (error?.status === 423 && (error?.error?.code === 'ACCOUNT_LOCKED' || error?.error?.message)) {
          this.accountLocked = true;
          this.apiErrorMessage = error?.error?.message || 'Account locked for 15 minutes.';
          return;
        }

        const msg = error?.error?.message || '';
        this.apiErrorMessage = (msg === 'User not found' ? 'Email does not exist' : msg) || 'Invalid credentials';
      }
    });
  }

  requestUnblockPin() {
    if (!this.email?.trim()) {
      this.unblockPinError = 'Email is required';
      return;
    }
    this.unblockPinError = '';
    this.unblockPinLoading = true;
    this.authService.unblockRequest(this.email.trim()).subscribe({
      next: () => {
        this.unblockPinSent = true;
        this.unblockPin = '';
        this.unblockPinLoading = false;
      },
      error: (err) => {
        this.unblockPinError = err?.error?.message || 'Failed to send PIN';
        this.unblockPinLoading = false;
      }
    });
  }

  verifyUnblockPin() {
    if (!this.email?.trim() || !this.unblockPin?.trim()) {
      this.unblockPinError = 'Please enter the PIN received by email';
      return;
    }
    this.unblockPinError = '';
    this.unblockPinLoading = true;
    this.authService.unblockVerify(this.email.trim(), this.unblockPin.trim()).subscribe({
      next: () => {
        this.unblockSuccess = true;
        this.unblockPinLoading = false;
      },
      error: (err) => {
        this.unblockPinError = err?.error?.message || 'Invalid or expired PIN';
        this.unblockPinLoading = false;
      }
    });
  }

  resetUnblockState() {
    this.accountLocked = false;
    this.unblockPinSent = false;
    this.unblockPin = '';
    this.unblockPinError = '';
    this.unblockSuccess = false;
    this.apiErrorMessage = '';
  }

  // ✅ fallback: essayer de lire le role depuis JWT si /me échoue
  private getRoleFromJwt(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (payload?.role || payload?.roles?.[0] || payload?.authorities?.[0] || null);
    } catch {
      return null;
    }
  }

  async loginWithPasskey() {
    this.passkeyError = '';
    this.passkeyLoading = true;

    try {
      // 1) login webauthn => token
      const token = await this.webAuthn.loginWithPasskey(this.email);

      // 2) stocker token
      localStorage.setItem('token', token);

      // 3) récupérer role via /me (meilleur)
      this.userService.getMe().subscribe({
        next: (u: any) => {
          const role = (u.role || '').toString().toUpperCase();

          localStorage.setItem('role', role);
          localStorage.setItem('email', u.email);

          this.session.setUser({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            avatarUrl: u.avatarUrl,
            role
          });

          // ✅ diriger selon role
          this.navigateByRole(role);
        },
        error: (err) => {
          console.error('getMe failed after passkey login', err);

          // 4) fallback: role depuis JWT
          const roleFromJwt = (this.getRoleFromJwt(token) || '').toUpperCase();
          if (roleFromJwt) {
            localStorage.setItem('role', roleFromJwt);
            this.navigateByRole(roleFromJwt);
            return;
          }

          this.passkeyError = 'Sign-in successful but could not retrieve your role.';
        }
      });

    } catch (e: any) {
      console.error('passkey login error', e);
      this.passkeyError = e?.message || 'Passkey sign-in failed';
    } finally {
      this.passkeyLoading = false;
    }
  }

  private afterAuthSuccess(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', (response.role || '').toUpperCase());
    localStorage.setItem('email', response.email);

    this.userService.getMe().subscribe({
      next: (u: any) => {
        this.session.setUser({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          avatarUrl: u.avatarUrl,
          role: (response.role || '').toUpperCase()
        });

        this.navigateByRole(response.role);
      },
      error: () => {
        this.navigateByRole(response.role);
      }
    });
  }

  private navigateByRole(role: string) {
    const r = (role || '').toUpperCase();
    if (r === 'ADMIN') this.router.navigate(['/backoffice']);
    else if (r === 'TUTOR') this.router.navigate(['/client']);
    else if (r === 'STUDENT') this.router.navigate(['/client']);
    else if (r === 'CANDIDATE') this.router.navigate(['/candidate']);
    else this.router.navigate(['/']);
  }

  continueWithGoogle() {
    const r = (this.role || '').toLowerCase();
    if (r !== 'student' && r !== 'candidate') return;

    const deviceId = this.getOrCreateDeviceId();
    this.setDeviceIdCookie(deviceId);

    const backendRole = r.toUpperCase();
    window.location.href = `http://localhost:8080/oauth2/authorize/google/login/${backendRole}`;
  }

  goToQrLogin() {
    this.router.navigate(['/auth/qr-login'], { queryParamsHandling: 'merge' });
  }
}