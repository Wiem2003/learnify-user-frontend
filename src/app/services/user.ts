import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiBaseUrl } from '../utils/api-base';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  about?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${apiBaseUrl()}/api/users`;
  private adminUrl = `${apiBaseUrl()}/api/admin/users`;

  // ✅ NEW: me sessions
  private meUrl = `${apiBaseUrl()}/api/me`;

  constructor(private http: HttpClient) {}

  // me
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  updateMe(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/me`, data);
  }

  changePassword(payload: { currentPassword: string; newPassword: string; confirmNewPassword: string }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/me/password`, payload);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ avatarUrl: string }>(`${this.baseUrl}/me/avatar`, formData);
  }

  // ✅ NEW: crée une session côté backend (pour Google OAuth redirect)
  trackSession(): Observable<void> {
    return this.http.post<void>(`${this.meUrl}/sessions/track`, {});
  }

  // ✅ admin users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }
}