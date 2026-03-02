import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    // endpoints publics (pas de token)
    const publicEndpoints = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/forgot-password',
      '/api/auth/reset-password',

      // ✅ login passkey (public)
      '/api/webauthn/authenticate'
    ];

    const isPublic = publicEndpoints.some(url => req.url.includes(url));

    // 👉 on ajoute le token pour tout le reste
    if (token && !isPublic) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}