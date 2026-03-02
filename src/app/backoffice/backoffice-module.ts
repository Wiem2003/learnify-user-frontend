import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BackofficeRoutingModule } from './backoffice-routing-module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { Dashboard } from './dashboard/dashboard';
import { UsersComponent } from './userslist/users';
import { UsersStatsComponent } from './users-stats/users-stats';
import { AddAdminComponent } from './admins/add-admin';
import { AddTutorComponent } from './tutors/add-tutor';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    Dashboard,
    UsersComponent,
    UsersStatsComponent,
    AddAdminComponent,
    AddTutorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BackofficeRoutingModule,
  ],
})
export class BackofficeModule { }
