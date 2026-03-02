import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserManagementRoutingModule } from './user-management-routing-module';

import { GmailEmailValidatorDirective } from './validators/gmail-email.validator';
import { ConfirmPasswordValidatorDirective } from './validators/confirm-password.validator';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';
import { PinCheck } from './pin-check/pin-check'; // ✅ ICI
import { Oauth2Redirect } from './oauth2Redirect/oauth2-redirect';
import { DevicePendingComponent } from './device-pending/device-pending';
import { DeviceConfirmComponent } from './device-confirm/device-confirm';
import { DeviceRejectComponent } from './device-reject/device-reject';


@NgModule({
  declarations: [
    GmailEmailValidatorDirective,
    ConfirmPasswordValidatorDirective,
    Signin,
    Signup,
    ForgotPassword,
    ResetPassword,
    PinCheck ,// ✅ ICI
    Oauth2Redirect,
  DevicePendingComponent,
  DeviceConfirmComponent,
  DeviceRejectComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }