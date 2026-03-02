import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeroComponent } from './hero/hero.component';
import { PricingComponent } from './pricing/pricing.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CoursesComponent } from './courses/courses.component';
import { MentorComponent } from './mentor/mentor.component';
import { GroupComponent } from './group/group.component';
import { GetStartedModalComponent } from './get-started-modal/get-started-modal.component';
import { FeaturesComponent } from './features/features.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeroComponent,
    PricingComponent,
    TestimonialsComponent,
    CoursesComponent,
    MentorComponent,
    GroupComponent,
    GetStartedModalComponent,
    FeaturesComponent
  ],
  exports: [
    HeroComponent,
    PricingComponent,
    TestimonialsComponent,
    CoursesComponent,
    MentorComponent,
    GroupComponent,
    GetStartedModalComponent,
    FeaturesComponent
  ]
})
export class ComponentsModule { }
