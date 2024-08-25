import { Routes } from '@angular/router';
import { notAuthGuard } from './shared/notAuthGuard/not-auth.guard';
import { AuthGuard } from './shared/authGuard/auth-guard.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./core/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [notAuthGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./core/user-pages/users.component').then((m) => m.UsersComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/user-pages/user-view/user-view.component').then(
            (m) => m.UserViewComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './core/user-pages/user-component/user-component.component'
          ).then((m) => m.UserComponentComponent),
        canActivate: [AuthGuard],
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import(
            './core/user-pages/user-edit-component/user-edit-component.component'
          ).then((m) => m.UserEditComponentComponent),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
