# Migration BackOffice — Analyse et plan

## 1. Analyse structure

### 1.1 UAndPManagement — Backoffice actuel

| Élément | Détail |
|--------|--------|
| **Module** | `BackofficeModule` (`backoffice-module.ts`) |
| **Routing** | `BackofficeRoutingModule` — chargé via `loadChildren` sur path `backoffice` |
| **Routes actuelles** | `''` → Dashboard ; `users` → UsersComponent ; `users-stats` → UsersStatsComponent ; `admins/add` → AddAdminComponent ; `tutors/add` → AddTutorComponent |
| **Composants métier** | Dashboard, UsersComponent (userslist), UsersStatsComponent (users-stats), AddAdminComponent (admins), AddTutorComponent (tutors) |
| **Imports module** | CommonModule, FormsModule, ReactiveFormsModule, BackofficeRoutingModule — **pas de RouterModule** (à ajouter pour `routerLink` / `router-outlet`) |

**Chemins complets :**
- `/backoffice` → Dashboard
- `/backoffice/users` → Users
- `/backoffice/users-stats` → Role Statistics
- `/backoffice/admins/add` → Add Admin
- `/backoffice/tutors/add` → Add Tutor

### 1.2 FrontOffice-main — Template admin

| Élément | Détail |
|--------|--------|
| **Layout** | `AdminLayoutComponent` dans `admin/layout/` (HTML, TS, SCSS) |
| **Structure** | Sidebar (brand + nav + footer "Back to Site") + header (toggle, search, user menu) + `<main class="admin-content"><router-outlet></router-outlet></main>` |
| **Navigation** | `navItems` en dur : dashboard, users, courses, events (on ne garde que Dashboard, Users, Add Admin, Add Tutor, Role Statistics) |
| **Styles** | `admin-layout.component.scss` (variables SCSS locales + `var(--color-*)`), `_admin-shared.scss` pour pages (optionnel pour contenu) |
| **Variables CSS** | FrontOffice `styles.scss` définit `:root` avec `--color-primary`, `--color-background`, `--font-family`, etc. |

### 1.3 Mapping proposé

| Template (sidebar) | Route UAndPManagement | Composant existant |
|--------------------|----------------------|--------------------|
| Dashboard | `''` (ou redirect) | `Dashboard` |
| Users | `users` | `UsersComponent` |
| Add Admin | `admins/add` | `AddAdminComponent` |
| Add Tutor | `tutors/add` | `AddTutorComponent` |
| Role Statistics | `users-stats` | `UsersStatsComponent` |

**Placement du shell :**
- Créer `AdminLayoutComponent` dans `UAndPManagement/src/app/backoffice/layout/`.
- Modifier le routing backoffice : **une route parente** `path: ''` avec `component: AdminLayoutComponent` et **children** = routes actuelles (Dashboard, users, users-stats, admins/add, tutors/add).
- Le contenu métier (Dashboard, Users, etc.) s’affiche dans le `<router-outlet>` du layout.

---

## 2. Intégration (résumé)

1. **Créer** `backoffice/layout/admin-layout.component.ts|html|scss` (copie adaptée du template FrontOffice).
2. **navItems** : liens relatifs vers `users`, `admins/add`, `tutors/add`, `users-stats`, et `''` ou `'.'` pour Dashboard.
3. **Router** : ajouter `RouterModule` au `BackofficeModule` et refactoriser `backoffice-routing-module.ts` en parent (layout) + children.
4. **Session** : dans le header du layout, injecter `SessionService`, afficher `user$ | async` (nom, avatar), bouton/log lien Logout → `SessionService.clear()` + `Router.navigate(['/signin'], { queryParams: { role: 'ADMIN' } })` (ou route login existante).
5. **Styles** : ajouter les variables CSS `:root` nécessaires (ex. dans `styles.css` ou dans un fichier SCSS importé) pour que le layout SCSS s’affiche correctement ; Tabler Icons déjà présents dans `angular.json`.

---

## 3. Fichiers à créer

- `backoffice/layout/admin-layout.component.ts`
- `backoffice/layout/admin-layout.component.html`
- `backoffice/layout/admin-layout.component.scss`

## 4. Fichiers à modifier

- `backoffice/backoffice-routing-module.ts` (parent + children)
- `backoffice/backoffice-module.ts` (déclarer `AdminLayoutComponent`, importer `RouterModule`)
- `src/styles.css` (ou équivalent) — variables CSS pour admin si besoin

## 5. Non modifiés (contraintes)

- Services : `SessionService`, `UserService`, guards, interceptors, endpoints.
- Composants métier : Dashboard, Users, UsersStats, AddAdmin, AddTutor (TS + logique).
- Auth flow, routes app-level (`/backoffice` loadChildren inchangé).

---

## 6. Livrables (post-migration)

### Fichiers ajoutés

| Fichier |
|--------|
| `src/app/backoffice/layout/admin-layout.component.ts` |
| `src/app/backoffice/layout/admin-layout.component.html` |
| `src/app/backoffice/layout/admin-layout.component.scss` |
| `BACKOFFICE_MIGRATION_PLAN.md` (ce document) |

### Fichiers modifiés

| Fichier | Modification |
|--------|----------------|
| `src/app/backoffice/backoffice-routing-module.ts` | Route parente `AdminLayoutComponent` + routes enfants (Dashboard, users, users-stats, admins/add, tutors/add) |
| `src/app/backoffice/backoffice-module.ts` | Déclaration `AdminLayoutComponent`, import `RouterModule` |
| `src/styles.css` | Variables CSS `:root` pour le layout admin (--color-primary, --color-accent, --font-family, etc.) |
| `src/index.html` | Lien Google Fonts Poppins (optionnel, pour cohérence visuelle du layout admin) |

### Commandes pour tester

```bash
cd UAndPManagement
npm install   # si besoin
ng serve
```

Puis dans le navigateur :

- `http://localhost:4200/backoffice` → doit afficher le nouveau layout (sidebar + header) avec le Dashboard en zone de contenu.
- Cliquer sur **Users** → `/backoffice/users` (liste des utilisateurs, logique inchangée).
- Cliquer sur **Add Admin** → `/backoffice/admins/add`.
- Cliquer sur **Add Tutor** → `/backoffice/tutors/add`.
- Cliquer sur **Role Statistics** → `/backoffice/users-stats`.
- Vérifier en haut à droite : nom/avatar de l’utilisateur connecté (si session), bouton Logout.
- **Back to Site** dans la sidebar → retour à `/`.

### Checklist manuelle

- [ ] `ng serve` démarre sans erreur.
- [ ] `/backoffice` charge le nouveau layout (sidebar + header).
- [ ] Navigation sidebar : Dashboard, Users, Add Admin, Add Tutor, Role Statistics.
- [ ] Page Users affiche la liste et conserve recherche / tri / pagination.
- [ ] Add Admin / Add Tutor / Role Statistics s’affichent et gardent leur logique.
- [ ] Header : utilisateur connecté affiché (nom/avatar si `SessionService` renseigné).
- [ ] Bouton Logout : déconnexion + redirection vers `/auth/login?role=ADMIN`.
- [ ] Lien « Back to Site » → `/`.
- [ ] Aucune modification des services, guards, interceptors, endpoints.
