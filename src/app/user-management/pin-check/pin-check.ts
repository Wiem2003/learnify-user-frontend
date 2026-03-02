import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin-check',
  standalone: false,
  templateUrl: './pin-check.html',
  styleUrls: ['./pin-check.css']
})
export class PinCheck {
  pin = '';
  error = '';
  loading = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.error = '';

    if (!this.pin || this.pin.length < 4) {
      this.error = 'Invalid PIN (min 4 digits).';
      return;
    }

    // ✅ pour l’instant: on valide localement
    localStorage.setItem('learnify_pin_ok', 'true');

    const role = (localStorage.getItem('role') || '').toUpperCase();
    if (role === 'ADMIN') this.router.navigate(['/backoffice']);
    else if (role === 'TUTOR') this.router.navigate(['/client']);
    else if (role === 'STUDENT') this.router.navigate(['/client']);
    else if (role === 'CANDIDATE') this.router.navigate(['/candidate']);
    else this.router.navigate(['/']);
  }
}