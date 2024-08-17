import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLogin: boolean = true;
  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  OnToggleAuth() {
    this.isLogin = !this.isLogin;
  }
  onSubmit() {
    if (this.isLogin) {
      if (this.authService.user) {
        console.log('userData');
      } else {
        console.log('no user');
      }

      this.authService
        .login(
          this.authForm.value.email as string,
          this.authForm.value.password as string
        )
        .pipe(
          tap(() => {
            this.router.navigate(['/']);
          })
        )
        .subscribe({
          next(value) {
            console.log(value);
          },
          error(err) {
            console.log(err);
          },
        });
      this.authService.user.subscribe((user) => {
        console.log('user', user);
      });
    } else {
      console.log('this is signup model');
    }
  }
}
