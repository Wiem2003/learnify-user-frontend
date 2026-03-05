import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Import core services for payments and certificates only
import { ApiGatewayService } from './services/api-gateway.service';
import { PaymentService } from './services/payment.service';
import { CertificateService } from './services/certificate.service';

/**
 * Core Module - Contains singleton services for API Gateway communication
 * This module should be imported ONLY in AppModule
 * 
 * FOCUSED ON: Payments & Certificates Management Only
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiGatewayService,
    PaymentService,
    CertificateService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
