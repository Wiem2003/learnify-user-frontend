import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { ComponentsModule } from '../components/components-module';

// IMPORT DES PAGES
import { CertificateComponent } from './certificate/certificate.component';
import { ClubsComponent } from './clubs/clubs.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CvComponent } from './cv/cv.component';
import { EventsComponent } from './events/events.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { MessengerComponent } from './messenger/messenger.component';
import { PaymentComponent } from './payment/payment.component';
import { PreevaluationComponent } from './preevaluation/preevaluation.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfileComponent } from './profile/profile';
import { ClientCoursesListComponent } from './courses/client-courses-list/client-courses-list.component';
import { ClientClubsListComponent } from './clubs/client-clubs-list/client-clubs-list.component';
import { ClientEventsListComponent } from './events/client-events-list/client-events-list.component';
import { DetailPlaceholderComponent } from './detail-placeholder/detail-placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CoreModule,
    ComponentsModule
  ],

  declarations: [
    CertificateComponent,
    ClubsComponent,
    CourseManagementComponent,
    CourseListComponent,
    CvComponent,
    EventsComponent,
    FeedbackComponent,
    JobOffersComponent,
    MessengerComponent,
    PaymentComponent,
    PreevaluationComponent,
    QuizComponent,
    ScheduleComponent,
    ProfileComponent,
    ClientCoursesListComponent,
    ClientClubsListComponent,
    ClientEventsListComponent,
    DetailPlaceholderComponent
  ],

  exports: [
  ]
})
export class PagesModule { }
