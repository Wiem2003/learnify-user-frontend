import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: false,
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;

  constructor(
    public session: SessionService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.session.clear();
    this.router.navigate(['/home']); // ✅ redirection vers la page 4 spaces
  }

  navItems = [
    { path: '', icon: 'ti ti-dashboard', label: 'Dashboard' },
    { path: 'users', icon: 'ti ti-users', label: 'Users' },
    { path: 'admins/add', icon: 'ti ti-user-plus', label: 'Add Admin' },
    { path: 'tutors/add', icon: 'ti ti-user-plus', label: 'Add Tutor' },
    { path: 'users-stats', icon: 'ti ti-chart-bar', label: 'Role Statistics' },
    { path: 'profile', icon: 'ti ti-id', label: 'My Profile' },
  ];
}