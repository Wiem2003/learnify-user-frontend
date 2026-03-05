import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';

export interface Certificate {
  id?: number;
  user_id: number;
  course_id: number;
  certificate_number: string;
  issue_date: string;
  completion_date: string;
  grade?: number;
  status: string;
  pdf_path?: string;
  verification_code: string;
  created_at?: string;
  updated_at?: string;
  user_name?: string;
  user_email?: string;
  course_title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly endpoint = '/certificates.php';

  constructor(private apiBaseService: ApiBaseService) {}

  // Get all certificates
  getCertificates(): Observable<Certificate[]> {
    return this.apiBaseService.get<Certificate[]>(this.endpoint);
  }

  // Get certificate by ID
  getCertificate(id: number): Observable<Certificate> {
    return this.apiBaseService.get<Certificate>(`${this.endpoint}?id=${id}`);
  }

  // Create new certificate
  createCertificate(certificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'>): Observable<Certificate> {
    return this.apiBaseService.post<Omit<Certificate, 'id' | 'created_at' | 'updated_at'>, Certificate>(this.endpoint, certificate);
  }

  // Update certificate
  updateCertificate(id: number, certificate: Partial<Certificate>): Observable<Certificate> {
    return this.apiBaseService.put<Partial<Certificate>, Certificate>(`${this.endpoint}?id=${id}`, certificate);
  }

  // Delete certificate
  deleteCertificate(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`${this.endpoint}?id=${id}`);
  }

  // Generate certificate PDF
  generateCertificate(certificateId: number): Observable<Blob> {
    return this.apiBaseService.get<Blob>(`${this.endpoint}?generate=${certificateId}`, {});
  }

  // Download certificate PDF
  downloadCertificate(certificateId: number, certificateNumber: string): void {
    this.generateCertificate(certificateId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${certificateNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading certificate:', error);
        alert('Failed to download certificate. Please try again.');
      }
    });
  }
}
