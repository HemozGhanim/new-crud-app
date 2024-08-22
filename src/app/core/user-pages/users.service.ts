import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  users = new BehaviorSubject<userCreationData | null>(null);

  createUser(user: userCreationData) {
    return this.http
      .post<userCreationData>(environment.databaseURL + 'users.json', user)
      .pipe(tap((data) => {}));
  }

  getUsers() {
    return this.http
      .get<userCreationData>(environment.databaseURL + 'users.json')
      .pipe(
        tap((data) => {
          this.users.next(data);
        })
      );
  }

  getUserById(id: any) {
    // console.log(this.users.value);
    return this.users.pipe();
  }
}
