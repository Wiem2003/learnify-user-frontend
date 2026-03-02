import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './frontoffice/home/home';

// ✅ Import du composant redirect Google
import { Oauth2Redirect } from './user-management/oauth2Redirect/oauth2-redirect';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
  // ✅ route utilisée par Spring après login Google
  { path: 'oauth2/redirect', component: Oauth2Redirect },

  // Page d'accueil publique — si connecté, Back ne doit pas y ramener → redirection /client
  { path: '', component: Home, canActivate: [guestGuard] },

  // Auth (login, signup) — si déjà connecté → redirection vers /client/home
  {
    path: 'auth',
    loadChildren: () =>
      import('./user-management/user-management-module').then(m => m.UserManagementModule),
    canActivate: [guestGuard]
  },

  // Backoffice
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./backoffice/backoffice-module').then(m => m.BackofficeModule)
  },

  // Client (Frontoffice student)
  {
    path: 'client',
    loadChildren: () =>
      import('./client-template/client-template-module')
        .then(m => m.ClientTemplateModule)
  },

  // (optionnel mais recommandé) -> fallback si route inconnue
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }