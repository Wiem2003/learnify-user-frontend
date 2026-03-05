import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentRecommendationComponent } from '../shared/components/payment-recommendation/payment-recommendation.component';

import { ClubsComponent } from '../pages/clubs/clubs.component';
import { EventsComponent } from '../pages/events/events.component';
import { MessengerComponent } from '../pages/messenger/messenger.component';
import { PreevaluationComponent } from '../pages/preevaluation/preevaluation.component';
import { PaymentComponent } from '../pages/payment/payment.component';
import { CertificateComponent } from '../pages/certificate/certificate.component';
import { FeedbackComponent } from '../pages/feedback/feedback.component';
import { CvComponent } from '../pages/cv/cv.component';
import { JobOffersComponent } from '../pages/job-offers/job-offers.component';
import { QuizComponent } from '../pages/quiz/quiz.component';
import { ScheduleComponent } from '../pages/schedule/schedule.component';
import { CartComponent } from '../pages/cart/cart.component';

@NgModule({
  declarations: [
    ClubsComponent,
    EventsComponent,
    MessengerComponent,
    PreevaluationComponent,
    PaymentComponent,
    CertificateComponent,
    FeedbackComponent,
    CvComponent,
    JobOffersComponent,
    QuizComponent,
    ScheduleComponent,
    CartComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule, 
    CoreModule, 
    SharedModule,
    PaymentRecommendationComponent
  ],
  exports: [
    ClubsComponent,
    EventsComponent,
    MessengerComponent,
    PreevaluationComponent,
    PaymentComponent,
    CertificateComponent,
    FeedbackComponent,
    CvComponent,
    JobOffersComponent,
    QuizComponent,
    ScheduleComponent,
    CartComponent,
  ],
})
export class FeaturesModule {}
