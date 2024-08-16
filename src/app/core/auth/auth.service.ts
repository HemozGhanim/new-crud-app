import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Subject, tap } from 'rxjs';
import { AuthData } from '../../shared/authData.model';
import { stringify } from 'querystring';
import { UserModel } from './userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<AuthData>();
  constructor(private http: HttpClient) {}

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
          localStorage.setItem('authData', JSON.stringify(data));
          this.user.next(data);
        })
      );
  }
}
