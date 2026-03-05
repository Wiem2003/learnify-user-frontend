import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  role: string = '';

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const r = (params['role'] || 'student').toString().toLowerCase();
      this.role = (r === 'student' || r === 'candidate') ? r : 'student';
    });
  }

  goBack(): void {
    this.router.navigate(['/auth/signup-choice']);
  }

  // ✅ deviceId + cookie DEVICE_ID (pour OAuth2)
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

  onSubmit(form: { valid?: boolean | null }) {
    this.error = '';

    if (form?.valid !== true) return;

    const r = (this.role || '').toLowerCase();
    if (r !== 'student' && r !== 'candidate') {
      this.error = 'Invalid role';
      return;
    }

    if (this.password !== this.confirmPassword) return;

    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.loading = true;

    const req$ = (r === 'student')
      ? this.authService.registerStudent(data)
      : this.authService.registerCandidate(data);

    req$.subscribe({
      next: () => {
        this.loading = false;
        alert(`${r} registered successfully`);
        this.router.navigate(['/auth/login'], { queryParams: { role: r } });
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.message || 'Signup failed';
        console.error('signup error', err);
      }
    });
  }

  // ✅ Google signup (Option 2)
  continueWithGoogle() {
    const r = (this.role || '').toLowerCase();
    if (r !== 'student' && r !== 'candidate') return;

    const deviceId = this.getOrCreateDeviceId();
    this.setDeviceIdCookie(deviceId);

    const backendRole = r.toUpperCase();
    window.location.href = `http://localhost:8080/oauth2/authorize/google/signup/${backendRole}`;
  }
}