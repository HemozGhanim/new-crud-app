// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../../core/auth/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivateFn {
//   constructor(private authService: AuthService, private router: Router) {}
//   canActivate(): boolean {
//     if (this.authService.user) {
//       return true;
//     } else {
//       this.router.navigate(['/auth']);
//       return false;
//     }
//   }
// }
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Observable, map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.user) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
