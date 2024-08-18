import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthData } from '../../shared/authData.model';
import { stringify } from 'querystring';
import { UserModel } from './userModel';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<AuthData | null>(null);
  authData!: AuthData;
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
        tap((data) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authData', JSON.stringify(data));
          }
          this.user.next(data);
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

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('authData');
    }
  }
}
