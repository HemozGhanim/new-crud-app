import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { unKnownUser, userCreationData } from '../../shared/userData.model';
import { AuthService } from '../auth/auth.service';
import { userKey } from './userKey';
import { ApiService } from './../../shared/Api-Services.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private authService: AuthService,
    private api_service: ApiService,
    private toastr: ToastrService
  ) {}
  users = new BehaviorSubject<userCreationData | null>(null);

  createUser(user: userCreationData) {
    return this.api_service
      .post<userKey>(
        environment.databaseURL + `users/${this.authService.userID}.json`,
        user
      )
      .pipe(
        tap(() => {
          this.toastr.success('User Created Successfuly');
        })
      );
  }

  getUsers() {
    this.users.next(null);
    return this.api_service
      .get<userCreationData>(
        environment.databaseURL + `users/${this.authService.userID}.json`
      )
      .pipe(
        tap((data) => {
          this.users.next(data);
        })
      );
  }

  getUserById(id: any) {
    return this.users.pipe(
      map((data: any) => {
        for (const key in data) {
          if (key === id) {
            return data[key];
          }
        }
      }),
      tap((data) => {})
    );
  }
  checkUser(id: any): Observable<any> {
    return this.api_service.get(
      environment.databaseURL + `users/${this.authService.userID}/${id}.json`
    );
  }

  updateUser(id: any, data: any) {
    return this.api_service
      .put<userCreationData>(
        environment.databaseURL + `users/${this.authService.userID}/${id}.json`,
        data
      )
      .pipe(
        tap(() => {
          this.toastr.success('User Updated Successfuly');
        })
      );
  }
  deleteUser(id: any) {
    return this.api_service
      .delete<userCreationData>(
        environment.databaseURL + `users/${this.authService.userID}/${id}.json`
      )
      .pipe(
        tap(() => {
          this.toastr.success('User Deleted Successfuly');
        })
      );
  }
}
