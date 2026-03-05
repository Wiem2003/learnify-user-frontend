import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrontofficeRoutingModule } from './frontoffice-routing-module';
import { AdminAccess } from './admin-access/admin-access';
import { TutorAccess } from './tutor-access/tutor-access';
import { CandidateAccess } from './candidate-access/candidate-access';
import { StudentAccess } from './student-access/student-access';
import { Home } from './home/home';

import { ComponentsModule } from '../client-template/components/components-module';
import { CoreModule } from '../client-template/core/core.module';

@NgModule({
  declarations: [
    AdminAccess,
    TutorAccess,
    CandidateAccess,
    StudentAccess,
    Home
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrontofficeRoutingModule,
    ComponentsModule,
    CoreModule
  ]
})
export class FrontofficeModule { }
