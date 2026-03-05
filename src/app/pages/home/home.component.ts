import { Component, ViewChild } from '@angular/core';
import { GetStartedModalComponent } from '../../components/get-started-modal/get-started-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent {
  @ViewChild('modal') modal!: GetStartedModalComponent;
}
