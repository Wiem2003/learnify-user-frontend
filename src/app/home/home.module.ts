import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from '../pages/home/home.component';
import { HeroComponent } from '../components/hero/hero.component';
import { FeaturesComponent } from '../components/features/features.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { MentorComponent } from '../components/mentor/mentor.component';
import { GroupComponent } from '../components/group/group.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { PricingComponent } from '../components/pricing/pricing.component';
import { GetStartedModalComponent } from '../components/get-started-modal/get-started-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturesComponent,
    CoursesComponent,
    MentorComponent,
    GroupComponent,
    TestimonialsComponent,
    PricingComponent,
    GetStartedModalComponent,
  ],
  imports: [CommonModule, RouterModule, CoreModule, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
