import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
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
      .pipe(
        tap((data) => {
          console.log('User created:', data);
        })
      );
  }

  getUsers() {
    return this.http
      .get<userCreationData>(environment.databaseURL + 'users.json')
      .pipe(
        tap((data) => {
          this.users.next(data);
          console.log(typeof data);
        })
      );
  }
}
