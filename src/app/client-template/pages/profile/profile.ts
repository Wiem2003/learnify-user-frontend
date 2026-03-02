import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../../services/user';

// ✅ SESSION: import du service de session
import { SessionService } from '../../../services/session';

// ✅ PASSKEY / WebAuthn
import { WebAuthnService } from '../../../services/webauthn';

// ✅ NEW: Sessions API
import { SessionsService, UserSessionDto } from '../../../services/sessions';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;
  loading = false;

  cacheBuster = Date.now();

  private originalEmail = '';

  // password
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordLoading = false;
  passwordSuccess = '';
  passwordError = '';

  // avatar upload
  selectedFile: File | null = null;
  avatarPreview: string | null = null;

  // ✅ Passkey UI
  passkeyLoading = false;
  passkeyMessage = '';
  passkeyError = '';

  // ✅ NEW: Sessions UI
  sessions: UserSessionDto[] = [];
  sessionsLoading = false;
  sessionsError = '';

  private readonly API_BASE = 'http://localhost:8080';

  constructor(
    private userService: UserService,
    private router: Router,

    // ✅ SESSION: injection du service pour pouvoir mettre à jour la navbar
    private session: SessionService,

    // ✅ PASSKEY
    private webAuthn: WebAuthnService,

    // ✅ NEW
private sessionsApi: SessionsService  ) {}

  ngOnInit(): void {
    this.load();
    this.loadSessions(); // ✅ NEW
  }

  getAvatarSrc(): string {
    if (this.avatarPreview) return this.avatarPreview;

    const url = this.user?.avatarUrl;
    if (url) {
      if (url.startsWith('http')) return `${url}?t=${this.cacheBuster}`;
      if (url.startsWith('/')) return `${this.API_BASE}${url}?t=${this.cacheBuster}`;
      if (url.startsWith('uploads/')) return `${this.API_BASE}/${url}?t=${this.cacheBuster}`;
      return `${this.API_BASE}/uploads/${url}?t=${this.cacheBuster}`;
    }

    return 'assets/img/avatar.png';
  }

  load(): void {
    this.loading = true;
    this.userService.getMe().subscribe({
      next: (u: User) => {
        this.user = u;
        this.originalEmail = u.email;
        this.loading = false;

        this.avatarPreview = null;
        this.selectedFile = null;
        this.cacheBuster = Date.now();

        // ✅ SESSION: mettre à jour la session quand on charge le profil
        this.session.setUser({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          avatarUrl: u.avatarUrl,
          about: u.about,
          role: localStorage.getItem('role') || undefined
        });
      },
      error: (err: any) => {
        this.loading = false;
        alert(err?.error?.message || 'Profile error');
      }
    });
  }

  // ✅ NEW
  loadSessions(): void {
    this.sessionsLoading = true;
    this.sessionsError = '';

    this.sessionsApi.getMySessions().subscribe({
      next: (data) => {
        this.sessions = data || [];
        this.sessionsLoading = false;
      },
      error: (err: any) => {
        this.sessionsLoading = false;
        this.sessionsError = err?.error?.message || 'Failed to load sessions';
        console.error('sessions error', err);
      }
    });
  }

  save(): void {
    this.loading = true;
    this.userService.updateMe({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      about: this.user.about
    }).subscribe({
      next: (updated: User) => {
        this.loading = false;
        alert('Profile updated successfully');

        if (this.originalEmail !== updated.email) {
          alert('Email changed. Please sign in again.');
          localStorage.clear();
          this.router.navigate(['/signin'], { queryParams: { role: 'STUDENT' } });
          return;
        }

        this.user = { ...this.user, ...updated };

        // ✅ SESSION: mise à jour session après modification infos
        this.session.setUser({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          avatarUrl: this.user.avatarUrl,
          about: this.user.about,
          role: localStorage.getItem('role') || undefined
        });
      },
      error: (err: any) => {
        this.loading = false;
        alert(err?.error?.message || 'Update failed');
      }
    });
  }

  changePassword(): void {
    this.passwordSuccess = '';
    this.passwordError = '';

    if (!this.currentPassword?.trim()) {
      this.passwordError = 'Current password is required';
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError = 'New password must be at least 6 characters';
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordError = 'New password and confirmation do not match';
      return;
    }

    this.passwordLoading = true;
    this.userService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    }).subscribe({
      next: () => {
        this.passwordLoading = false;
        this.passwordSuccess = 'Password updated successfully';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      },
      error: (err: any) => {
        this.passwordLoading = false;
        this.passwordError = err?.error?.message || 'Password change failed';
      }
    });
  }

  // ✅ Passkey activation from profile
  async enablePasskey(): Promise<void> {
    this.passkeyMessage = '';
    this.passkeyError = '';
    this.passkeyLoading = true;

    try {
      await this.webAuthn.enablePasskeyFromProfile();
      this.passkeyMessage = 'Face ID / Passkey enabled';
    } catch (e: any) {
      this.passkeyError = e?.message || 'Failed to enable passkey';
    } finally {
      this.passkeyLoading = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert('Image too large (max 2MB)');
      input.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image (PNG/JPG)');
      input.value = '';
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadAvatar(): void {
    if (!this.selectedFile) return;

    this.loading = true;
    this.userService.uploadAvatar(this.selectedFile).subscribe({
      next: (res: any) => {
        this.loading = false;

        // update url serveur
        this.user.avatarUrl = res.avatarUrl;
        this.cacheBuster = Date.now();

        this.selectedFile = null;

        // ✅ SESSION: mise à jour DIRECTE après upload avatar
        this.session.setUser({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          avatarUrl: this.user.avatarUrl,
          about: this.user.about,
          role: localStorage.getItem('role') || undefined
        });

        setTimeout(() => {
          this.avatarPreview = null;
        }, 300);

        alert('Photo updated successfully');
      },
      error: (err: any) => {
        this.loading = false;
        alert(err?.error?.message || 'Photo upload failed');
      }
    });
  }
}