import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session';
import { map, take } from 'rxjs';

/**
 * Guard pour les routes "invité" (login, signup, etc.).
 * Si l'utilisateur est déjà connecté → redirection vers /client/home.
 * Sinon → accès autorisé.
 * Empêche le retour avec le bouton Back vers les pages auth quand on est connecté.
 */
export const guestGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  return session.user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        return router.createUrlTree(['/client']);
      }
      return true;
    })
  );
};
