import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { customEmailValidator } from './email.validator';
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
  authLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  authSignUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    Repassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  value: any = null;
  showpassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  get LoginEmail() {
    return this.authLoginForm.get('email');
  }
  get LoginPassword() {
    return this.authLoginForm.get('password');
  }
  toggleShowPassword() {
    this.showpassword = !this.showpassword;
  }

  OnToggleAuth() {
    this.isLogin = !this.isLogin;
  }
  onSubmit() {
    if (this.isLogin) {
      this.authService
        .login(
          this.authLoginForm.value.email as string,
          this.authLoginForm.value.password as string
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
    } else {
      this.authService
        .signup(
          this.authSignUpForm.value.email as string,
          this.authSignUpForm.value.password as string
        )
        .pipe(
          tap(() => {
            this.router.navigate(['/']);
          })
        )
        .subscribe({
          next(value) {},
          error(err) {},
        });
    }
  }
}
