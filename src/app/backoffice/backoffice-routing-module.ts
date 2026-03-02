import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { Dashboard } from './dashboard/dashboard';
import { UsersComponent } from './userslist/users';
import { UsersStatsComponent } from './users-stats/users-stats';
import { AddAdminComponent } from './admins/add-admin';
import { AddTutorComponent } from './tutors/add-tutor';
import { AdminProfileComponent } from './profile/admin-profile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: Dashboard },
      { path: 'users', component: UsersComponent },
      { path: 'users-stats', component: UsersStatsComponent },
      { path: 'admins/add', component: AddAdminComponent },
      { path: 'tutors/add', component: AddTutorComponent },
      { path: 'profile', component: AdminProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
