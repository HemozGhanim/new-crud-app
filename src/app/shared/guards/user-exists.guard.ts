import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsersService } from '../../core/user-pages/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserExistsGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const userId = route.paramMap.get('id');

    if (!userId) {
      this.router.navigate(['/not-found']);
      return of(false);
    }

    return this.usersService.checkUser(userId).pipe(
      tap((response) => {
        if (!response || Object.keys(response).length === 0) {
          this.router.navigate(['/not-found']);
        }
      }),
      map((response) => !!response && Object.keys(response).length > 0),
      catchError((error) => {
        console.error('Error fetching user:', error);
        this.handleError(error);
        return of(false);
      })
    );
  }

  private handleError(error: any) {
    // Handle different error scenarios
    // e.g., network errors, unauthorized access, etc.
    this.router.navigate(['/error']);
  }
}
