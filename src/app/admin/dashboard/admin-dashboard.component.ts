import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { CertificateService } from '../../core/services/certificate.service';
import { Payment } from '../../core/models/payment.model';
import { Certificate } from '../../core/services/certificate.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    standalone: false,
})
export class AdminDashboardComponent implements OnInit {
    // Stats - will be loaded from backend
    stats = [
        { label: 'Total Revenue', value: '$0', icon: 'ti ti-currency-dollar', trend: '+0%', trendUp: true, color: '#10b981', loading: true },
        { label: 'Total Certificates', value: '0', icon: 'ti ti-certificate', trend: '+0%', trendUp: true, color: '#6366f1', loading: true },
        { label: 'Total Payments', value: '0', icon: 'ti ti-cash', trend: '+0%', trendUp: true, color: '#f59e0b', loading: true },
        { label: 'Pending Payments', value: '0', icon: 'ti ti-clock', trend: '+0%', trendUp: true, color: '#ef4444', loading: true },
    ];

    recentPayments: Payment[] = [];
    recentCertificates: Certificate[] = [];
    
    // Loading states
    loadingPayments = true;
    loadingCertificates = true;

    quickActions = [
        { label: 'View All Payments', icon: 'ti ti-cash', link: '/admin/payments' },
        { label: 'View All Certificates', icon: 'ti ti-certificate', link: '/admin/certificates' },
        { label: 'Create Payment', icon: 'ti ti-plus', link: '/admin/payments/new' },
    ];

    constructor(
        private paymentService: PaymentService,
        private certificateService: CertificateService
    ) {}

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        // Load total revenue
        this.paymentService.getTotalRevenue().subscribe({
            next: (revenue) => {
                this.stats[0].value = `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                this.stats[0].loading = false;
            },
            error: (error) => {
                console.error('Error loading revenue:', error);
                this.stats[0].value = '$0.00';
                this.stats[0].loading = false;
            }
        });

        // Load certificates count
        this.certificateService.getCertificatesCount().subscribe({
            next: (count) => {
                this.stats[1].value = count.toString();
                this.stats[1].loading = false;
            },
            error: (error) => {
                console.error('Error loading certificates count:', error);
                this.stats[1].value = '0';
                this.stats[1].loading = false;
            }
        });

        // Load all payments to calculate stats
        this.paymentService.getPayments().subscribe({
            next: (payments) => {
                this.recentPayments = payments.slice(0, 6); // Get last 6
                this.stats[2].value = payments.length.toString();
                this.stats[2].loading = false;
                
                // Count pending payments
                const pendingCount = payments.filter(p => p.paymentStatus === 'PENDING').length;
                this.stats[3].value = pendingCount.toString();
                this.stats[3].loading = false;
                
                this.loadingPayments = false;
            },
            error: (error) => {
                console.error('Error loading payments:', error);
                this.stats[2].value = '0';
                this.stats[2].loading = false;
                this.stats[3].value = '0';
                this.stats[3].loading = false;
                this.loadingPayments = false;
            }
        });

        // Load recent certificates
        this.certificateService.getCertificates().subscribe({
            next: (certificates) => {
                this.recentCertificates = certificates.slice(0, 6); // Get last 6
                this.loadingCertificates = false;
            },
            error: (error) => {
                console.error('Error loading certificates:', error);
                this.loadingCertificates = false;
            }
        });
    }

    // Convert payment to activity format
    get recentActivity() {
        const activities: any[] = [];
        
        // Add recent payments
        this.recentPayments.slice(0, 3).forEach(payment => {
            activities.push({
                action: `Payment ${payment.paymentStatus}`,
                user: payment.userName || 'Unknown User',
                time: this.getTimeAgo(payment.paymentDate),
                icon: 'ti ti-cash',
                color: payment.paymentStatus === 'COMPLETED' ? '#10b981' : '#f59e0b'
            });
        });
        
        // Add recent certificates
        this.recentCertificates.slice(0, 3).forEach(cert => {
            activities.push({
                action: 'Certificate Issued',
                user: cert.user_name || 'Unknown User',
                time: this.getTimeAgo(cert.issue_date),
                icon: 'ti ti-certificate',
                color: '#6366f1'
            });
        });
        
        return activities.slice(0, 6);
    }

    private getTimeAgo(date: string | undefined): string {
        if (!date) return 'Unknown';
        
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    }
}
