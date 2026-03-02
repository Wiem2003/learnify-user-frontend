import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';
import { PinCheck } from './pin-check/pin-check'; // ✅
import { Oauth2Redirect } from './oauth2Redirect/oauth2-redirect';
import { DevicePendingComponent } from './device-pending/device-pending';
import { DeviceConfirmComponent } from './device-confirm/device-confirm';
import { DeviceRejectComponent } from './device-reject/device-reject';


const routes: Routes = [
  { path: 'login', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  // ✅ pin-check
  { path: 'pin-check', component: PinCheck },
  { path: 'oauth2/redirect', component: Oauth2Redirect},
  { path: 'device-pending', component: DevicePendingComponent },
{ path: 'device-confirm', component: DeviceConfirmComponent },
{ path: 'device-reject', component: DeviceRejectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }