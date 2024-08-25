import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  OperatorFunction,
  Subscription,
  tap,
} from 'rxjs';
import { userCreationData } from '../../shared/userData.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { userKey } from './userKey';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  users = new BehaviorSubject<userCreationData | null>(null);

  createUser(user: userCreationData) {
    return this.http
      .post<userKey>(environment.databaseURL + 'users.json', user)
      .pipe(
        tap((data) => {
          console.log(data);
        })
      );
  }

  getUsers() {
    return this.http
      .get<userCreationData>(environment.databaseURL + `users.json`)
      .pipe(
        tap((data) => {
          console.log(data);
          this.users.next(data);
        })
      );
  }

  getUserById(id: any) {
    return this.users.pipe();
  }
}
