import { Routes } from '@angular/router';
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
