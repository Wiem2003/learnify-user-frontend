import { Component, signal, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, SessionUser } from '../../../services/session';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: false,
})
export class NavbarComponent implements OnInit {
  /** Sur la page d'accueil publique (/) : pas de lien Profil, Get Started → signup-choice */
  @Input() isPublic = false;
  @Output() openModal = new EventEmitter<void>();
  activeSection = signal<string>('hero');

  user: SessionUser | null = null;
  private readonly API_BASE = 'http://localhost:8080';
  cacheBuster = Date.now();

  constructor(
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.session.user$.subscribe((u: SessionUser | null) => {
      this.user = u;
      this.cacheBuster = Date.now();
    });
  }

  getAvatar(): string {
    if (!this.user?.avatarUrl) return 'assets/img/avatar.png';
    const url = this.user.avatarUrl;
    if (url.startsWith('http')) return `${url}?t=${this.cacheBuster}`;
    if (url.startsWith('/')) return `${this.API_BASE}${url}?t=${this.cacheBuster}`;
    if (url.startsWith('uploads/')) return `${this.API_BASE}/${url}?t=${this.cacheBuster}`;
    return `${this.API_BASE}/uploads/${url}?t=${this.cacheBuster}`;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['hero', 'courses', 'mentor', 'group', 'testimonials', 'pricing'];
    const scrollPosition = window.pageYOffset + 100;
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    const url = this.router.url.split('?')[0];
    const isClientHome = url === '/client' || url === '/client/';
    if (!isClientHome) {
      this.router.navigate(['/client']).then(() => {
        setTimeout(() => this.scrollToSection(sectionId), 100);
      });
    } else {
      this.scrollToSection(sectionId);
    }
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      this.activeSection.set(sectionId);
    }
  }

  navigateToPage(route: string) {
    this.router.navigate([route.startsWith('/') ? route : '/' + route]);
  }

  isHomePage(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/client' || url === '/client/';
  }

  isActiveRoute(path: string): boolean {
    const url = this.router.url.split('?')[0];
    if (path === '/') return url === '' || url === '/';
    if (path === '/client' || path === '/client/') return url === '/client' || url === '/client/';
    return url.startsWith(path);
  }

  onGetStarted() {
    if (this.isPublic) {
      this.router.navigate(['/auth/signup-choice']);
    } else {
      this.openModal.emit();
    }
  }

  logout(): void {
    this.session.clear();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
