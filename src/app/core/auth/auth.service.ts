import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthData } from '../../shared/authData.model';
import { stringify } from 'querystring';
import { UserModel } from './userModel';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  authData!: User;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string) {
    let body: UserModel = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthData>(
        environment.firebase.authDomain + 'key=' + environment.firebase.apiKey,
        body
      )
      .pipe(
        catchError(this.errorHandler),
        tap((data) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authData', JSON.stringify(data));
          }
          this.handleAuth(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
          // this.user.next(data);
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.authData = JSON.parse(localStorage.getItem('authData')!);
      if (this.authData) {
        this.user.next(this.authData);
      }
    }
  }

  signup(email: string, password: string) {
    let body: UserModel = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthData>(
        environment.firebase.signUpDomain +
          'key=' +
          environment.firebase.apiKey,
        body
      )
      .pipe(
        catchError(this.errorHandler),
        tap((data) => {
          const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn! * 1000
          );
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(
              'authData',
              JSON.stringify(
                new User(data.email, data.localId, data.idToken, expirationDate)
              )
            );
          }
          this.handleAuth(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        })
      );
  }
  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('authData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }
  }
  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.signOut(),
      expirationDuration
    );
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (!errorRes || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
        case 'USER_DISABLED':
          errorMessage = 'This user has been disabled';
          break;
        default:
          errorMessage = 'An error occurred';
      }
      return throwError(() => new Error(errorMessage));
    }
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn! * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('authData', JSON.stringify(user));
    this.user.next(user);
    this.autoSignOut(+expiresIn! * 1000);
  }
}
