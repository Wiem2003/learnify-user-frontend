import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-qr-approve',
  standalone: false,
  templateUrl: './qr-approve.html'
})
export class QrApproveComponent implements OnInit {

  token: string | null = null;
  isApproved = false;

  hasError = false;
  errorMsg = '';

  email = '';
  password = '';
  loading = false;

  showPassword = false;

  // même host que le front + port backend
  private backendBase = `http://${window.location.hostname}:8080`;

  // ✅ role/space reçu dans l’URL: ?role=student|admin|tutor
  private role: string = 'student';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const approved = (params['approved'] || '').toString().toLowerCase();
      if (approved === 'true') {
        this.isApproved = true;
        this.token = null;
        return;
      }

      const t = (params['token'] || '').toString();
      if (!t) {
        this.hasError = true;
        this.errorMsg = 'Missing QR token. Please scan the QR code again.';
        return;
      }

      // ✅ lire role depuis QR URL
      this.role = ((params['role'] || 'student') + '').toLowerCase();

      this.token = t;
      this.hasError = false;
      this.errorMsg = '';
    });
  }

  async approveWithPassword() {
    if (!this.token) {
      this.hasError = true;
      this.errorMsg = 'Missing QR token.';
      return;
    }

    this.loading = true;
    this.hasError = false;
    this.errorMsg = '';

    try {
      // 1) LOGIN => JWT (✅ on envoie role)
      const loginRes: any = await firstValueFrom(
        this.http.post(`${this.backendBase}/api/auth/login`, {
          email: this.email,
          password: this.password,
          role: (this.role || 'student').toUpperCase() // ✅ IMPORTANT
        })
      );

      const jwt = loginRes?.token;
      if (!jwt) throw new Error('Backend did not return token');

      // 2) APPROVE QR
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

      await firstValueFrom(
        this.http.post(
          `${this.backendBase}/api/auth/qr/approve`,
          { token: this.token },
          { headers }
        )
      );

      // 3) OK => affiche success
      this.router.navigate([], {
        queryParams: { approved: true },
        queryParamsHandling: 'merge'
      });

    } catch (err: any) {
      this.hasError = true;
      const status = err?.status;
      const msg = err?.error?.message || err?.message || 'Unknown error';
      this.errorMsg = `Approve failed (${status || 'no status'}): ${msg}`;
      console.error('QR APPROVE ERROR', err);
    } finally {
      this.loading = false;
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
  }
}