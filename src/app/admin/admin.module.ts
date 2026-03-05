import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './users/admin-users.component';
import { AdminCoursesComponent } from './courses/admin-courses.component';
import { AdminEventsComponent } from './events/admin-events.component';

// Payment Components
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';

// Certificate Components
import { CertificateListComponent } from './certificates/certificate-list/certificate-list.component';
import { CertificateFormComponent } from './certificates/certificate-form/certificate-form.component';

// Shared Module
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminCoursesComponent,
    AdminEventsComponent,
    PaymentListComponent,
    PaymentFormComponent,
    CertificateListComponent,
    CertificateFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,  // Import SharedModule for navbar and footer
  ],
})
export class AdminModule {}
