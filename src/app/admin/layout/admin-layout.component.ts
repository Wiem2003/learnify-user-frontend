import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
    path: string;
    icon: string;
    label: string;
    children?: NavItem[];
}

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss',
    standalone: false,
})
export class AdminLayoutComponent {
    sidebarCollapsed = false;
    currentDate = new Date();

    constructor(private router: Router) {}

    toggleSidebar(): void {
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    navItems: NavItem[] = [
        { path: '/admin/dashboard', icon: 'ti ti-dashboard', label: 'Dashboard' },
        { path: '/admin/users', icon: 'ti ti-users', label: 'Users' },
        { path: '/admin/courses', icon: 'ti ti-book', label: 'Courses' },
        { path: '/admin/events', icon: 'ti ti-calendar-event', label: 'Events' },
        { 
            path: '/admin/payments', 
            icon: 'ti ti-credit-card', 
            label: 'Payments',
            children: [
                { path: '/admin/payments', icon: 'ti ti-list', label: 'Payment List' },
                { path: '/payment-management', icon: 'ti ti-settings', label: 'Payment Management' }
            ]
        },
    ];
}
