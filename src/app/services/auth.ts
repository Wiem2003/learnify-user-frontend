import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getOrCreateDeviceId } from '../utils/device';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/student`, data);
  }

  registerCandidate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/candidate`, data);
  }

  // ✅ login centralisé (device + ua + etc)
  login(data: any): Observable<any> {

    const payload = {
      email: data.email,
      password: data.password,
      role: (data.role || '').toUpperCase(),

      deviceId: getOrCreateDeviceId(),
      userAgent: navigator.userAgent,
      platform: (navigator as any).platform || '',
      language: navigator.language || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    };

    return this.http.post(`${this.baseUrl}/login`, payload);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }, { responseType: 'text' as const });
  }

  resetPassword(data: { email: string; pin: string; newPassword: string; confirmNewPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data, { responseType: 'text' as const });
  }

  /** Demande d'envoi du PIN de déblocage par email (compte bloqué après 3 échecs). */
  unblockRequest(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/unblock-request`, { email }, { responseType: 'text' as const });
  }

  /** Vérification du PIN de déblocage. */
  unblockVerify(email: string, pin: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/unblock-verify`, { email, pin }, { responseType: 'text' as const });
  }

  confirmDevice(token: string) {
    return this.http.post<any>(
      `http://localhost:8080/api/auth/device/confirm?token=${encodeURIComponent(token)}`,
      {}
    );
  }

  rejectDevice(token: string) {
    return this.http.post<any>(
      `http://localhost:8080/api/auth/device/reject?token=${encodeURIComponent(token)}`,
      {}
    );
  }
}