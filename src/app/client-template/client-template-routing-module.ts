import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile';
import { ClientCoursesListComponent } from './pages/courses/client-courses-list/client-courses-list.component';
import { ClientClubsListComponent } from './pages/clubs/client-clubs-list/client-clubs-list.component';
import { ClientEventsListComponent } from './pages/events/client-events-list/client-events-list.component';
import { DetailPlaceholderComponent } from './pages/detail-placeholder/detail-placeholder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'courses', component: ClientCoursesListComponent },
  { path: 'courses/:id', component: DetailPlaceholderComponent },
  { path: 'clubs', component: ClientClubsListComponent },
  { path: 'clubs/:id', component: DetailPlaceholderComponent },
  { path: 'events', component: ClientEventsListComponent },
  { path: 'events/:id', component: DetailPlaceholderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTemplateRoutingModule { }
