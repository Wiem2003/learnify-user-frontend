import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * API Gateway Interceptor
 * Handles common HTTP concerns for all requests going through the API Gateway
 * - Adds authentication headers
 * - Handles errors globally
 * - Implements retry logic
 * - Logs requests (in development)
 */
@Injectable()
export class ApiGatewayInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add headers
    let modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add authentication token if available
    const token = this.getAuthToken();
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Log request in development mode
    if (!this.isProduction()) {
      console.log('[API Gateway] Request:', {
        method: modifiedReq.method,
        url: modifiedReq.url,
        headers: modifiedReq.headers.keys()
      });
    }

    // Send the request and handle errors
    return next.handle(modifiedReq).pipe(
      retry(1), // Retry failed requests once
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * Get authentication token from storage
   * TODO: Implement actual token retrieval logic
   */
  private getAuthToken(): string | null {
    // This should be replaced with actual token retrieval from your auth service
    return localStorage.getItem('auth_token');
  }

  /**
   * Check if running in production mode
   */
  private isProduction(): boolean {
    return false; // Replace with actual environment check
  }

  /**
   * Handle HTTP errors globally
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      
      // Handle specific error codes
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          // TODO: Redirect to login page
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later.';
          break;
      }
    }

    console.error('[API Gateway] Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
