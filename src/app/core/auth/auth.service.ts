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
import { ToastrService } from 'ngx-toastr';
import { ApiAuthService } from '../../shared/Api-Auth-Services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  authData!: User;
  private tokenExpirationTimer: any;
  userID!: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private api_auth_handler: ApiAuthService
  ) {
    this.autoLogin();
  }

  login(email: string, password: string) {
    let body: UserModel = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    this.userID = '';

    return this.api_auth_handler
      .post<AuthData>(environment.authDomain, body)
      .pipe(
        tap((data) => {
          this.handleLoginSuccessResponse(data);
          this.userID = data.localId;
        })
      );
  }

  signup(email: string, password: string) {
    let body: UserModel = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    this.userID = '';

    return this.api_auth_handler
      .post<AuthData>(environment.signUpDomain, body)
      .pipe(
        tap((data) => {
          this.handleSignUpSuccessResponse(data);
          this.userID = data.localId;
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      let storedData = localStorage.getItem('authData');
      if (storedData) {
        this.authData = JSON.parse(storedData!);
        this.userID = this.authData.id;
        this.user.next(
          new User(
            this.authData.email,
            this.authData.id,
            this.authData._token,
            new Date(this.authData._tokenExpirationDate)
          )
        );
      }
    }
  }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.user.next(null);
      this.userID = null!;
      this.router.navigate(['/auth']);
      localStorage.removeItem('authData');
      this.clearTokenExpirationTimer();
      // this.user.unsubscribe();
    }
  }

  autoSignOut(expirationDuration: number) {
    this.clearTokenExpirationTimer();
    this.tokenExpirationTimer = setTimeout(
      () => this.signOut(),
      expirationDuration
    );
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authData');
      return !!token;
    } else {
      return false;
    }
  }
  private clearTokenExpirationTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  CheckExpirationDate() {
    let exDate = this.authData ? this.authData._tokenExpirationDate : null;
    if (new Date() > new Date(exDate!)) {
      this.signOut();
    }
  }

  private handleLoginSuccessResponse(data: AuthData) {
    this.toastr.success('Authentication successful');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authData', JSON.stringify(data));
    }
    this.handleAuth(data.email, data.localId, data.idToken, data.expiresIn);
    this.userID = data.localId;
  }

  private handleSignUpSuccessResponse(data: AuthData) {
    this.toastr.success('Authentication successful');
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
    this.handleAuth(data.email, data.localId, data.idToken, data.expiresIn);
    this.userID = data.localId;
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
