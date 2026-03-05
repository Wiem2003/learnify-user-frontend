import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,  // Import standalone components
    FooterComponent
  ],
  exports: [
    NavbarComponent,  // Export for use in other modules
    FooterComponent
  ]
})
export class SharedModule { }
