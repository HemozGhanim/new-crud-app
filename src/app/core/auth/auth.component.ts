import { AuthService } from './auth.service';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
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
  //constructor
  constructor(private authService: AuthService, private router: Router) {}

  //variables
  isLogin: boolean = true;
  loading: boolean = false;
  matched!: boolean | null;
  value: any = null;
  // LoginpasswordInputValue: string = '';
  // SignUpPasswordInputValue: string = '';
  // SignUpRePasswordInputValue: string = '';
  showLoginPassword: boolean = false;
  showSignUpPassword: boolean = false;
  showSignUpRePassword: boolean = false;
  errorMessage: string = '';

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const Repassword = formGroup.get('Repassword')?.value;

    if (password !== Repassword) {
      formGroup.get('Repassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    formGroup.get('Repassword')?.setErrors(null);
    return null;
  };

  authLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, customEmailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  authSignUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, customEmailValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      Repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordMatchValidator }
  );

  get LoginEmail() {
    return this.authLoginForm.get('email');
  }
  get LoginPassword() {
    return this.authLoginForm.get('password');
  }
  get SignUpEmail() {
    return this.authSignUpForm.get('email');
  }
  get SignUpPassword() {
    return this.authSignUpForm.get('password');
  }
  get SignUpRePassword() {
    return this.authSignUpForm.get('Repassword');
  }
  togglePasswordVisibility(field: string) {
    if (field === 'LoginPassword') {
      this.showLoginPassword = !this.showLoginPassword;
    } else if (field === 'SignUpPassword') {
      this.showSignUpPassword = !this.showSignUpPassword;
    } else if (field === 'SignUpRePassword') {
      this.showSignUpRePassword = !this.showSignUpRePassword;
    }
  }

  OnToggleAuth() {
    this.isLogin = !this.isLogin;
  }
  onSubmit() {
    if (this.isLogin) {
      this.loading = true;
      this.authService
        .login(
          this.authLoginForm.value.email as string,
          this.authLoginForm.value.password as string
        )
        .pipe(
          tap(() => {
            this.loading = false;
            this.router.navigate(['/']);
          }),
          catchError((error) => {
            this.loading = false;
            throw error;
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
