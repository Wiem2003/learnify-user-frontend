import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-placeholder',
  template: `
    <app-navbar></app-navbar>
    <div class="client-page">
      <div class="container placeholder-content">
        <h1>{{ section }} detail</h1>
        <p>ID: {{ id }}</p>
        <p class="text-muted">This detail page will be wired to your business logic later.</p>
        <a [routerLink]="['/client', section]" class="btn-back">← Back to list</a>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .client-page { min-height: 100vh; background: var(--color-background); padding-top: 80px; padding-bottom: 2rem; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .placeholder-content { padding: 3rem 0; }
    .placeholder-content h1 { font-family: var(--font-family); color: var(--color-primary); margin-bottom: 1rem; }
    .text-muted { color: var(--color-gray-500); margin-bottom: 1.5rem; }
    .btn-back { display: inline-block; padding: 0.5rem 1rem; background: var(--color-primary); color: #fff; border-radius: 8px; text-decoration: none; }
    .btn-back:hover { opacity: 0.9; color: #fff; }
  `],
  standalone: false,
})
export class DetailPlaceholderComponent {
  section = 'courses';
  id = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'] || '';
      const segments = this.router.url.split('/').filter(Boolean);
      const clientIdx = segments.indexOf('client');
      if (clientIdx >= 0 && segments[clientIdx + 1]) {
        this.section = segments[clientIdx + 1];
      }
    });
  }
}
