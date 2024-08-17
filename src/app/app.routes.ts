import { Routes } from '@angular/router';
import { authGuard } from './shared/authGuard/auth-guard.guard';
import { notAuthGuard } from './shared/notAuthGuard/not-auth.guard';
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
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./core/users/users.component').then((m) => m.UsersComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./core/user-component/user-component.component').then(
            (m) => m.UserComponentComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import(
            './core/user-edit-component/user-edit-component.component'
          ).then((m) => m.UserEditComponentComponent),
      },
    ],
  },
];
