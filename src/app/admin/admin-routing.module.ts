import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './users/admin-users.component';
import { AdminCoursesComponent } from './courses/admin-courses.component';
import { AdminEventsComponent } from './events/admin-events.component';

// CRUD Components (to be created)
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { ClubsListComponent } from './clubs/clubs-list/clubs-list.component';
import { ClubFormComponent } from './clubs/club-form/club-form.component';
import { ClubDetailsComponent } from './clubs/club-details/club-details.component';

// Payment CRUD Components
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';

// Certificate CRUD Components
import { CertificateListComponent } from './certificates/certificate-list/certificate-list.component';
import { CertificateFormComponent } from './certificates/certificate-form/certificate-form.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'users', component: AdminUsersComponent },
            
            // Courses CRUD
            { path: 'courses', component: CoursesListComponent },
            { path: 'courses/create', component: CourseFormComponent },
            { path: 'courses/edit/:id', component: CourseFormComponent },
            { path: 'courses/:id', component: CourseDetailsComponent },
            
            // Events CRUD
            { path: 'events', component: EventsListComponent },
            { path: 'events/create', component: EventFormComponent },
            { path: 'events/edit/:id', component: EventFormComponent },
            { path: 'events/:id', component: EventDetailsComponent },
            
            // Clubs CRUD
            { path: 'clubs', component: ClubsListComponent },
            { path: 'clubs/create', component: ClubFormComponent },
            { path: 'clubs/edit/:id', component: ClubFormComponent },
            { path: 'clubs/:id', component: ClubDetailsComponent },
            
            // Payments CRUD
            { path: 'payments', component: PaymentListComponent },
            { path: 'payments/create', component: PaymentFormComponent },
            { path: 'payments/:id/edit', component: PaymentFormComponent },
            
            // Certificates CRUD
            { path: 'certificates', component: CertificateListComponent },
            { path: 'certificates/create', component: CertificateFormComponent },
            { path: 'certificates/:id/edit', component: CertificateFormComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
