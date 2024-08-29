import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '../../core/user-pages/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserExistsGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
      switchMap((user: any) => {
        if (user) {
          return of(true);
        } else {
          this.router.navigate(['/not-found']);
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        this.handleError(error);
        return of(false);
      })
    );
  }

  private handleError(error: any) {
    this.router.navigate(['/home']);
    this.toastr.error('An error occurred while fetching user data.', 'Error');
  }
}
