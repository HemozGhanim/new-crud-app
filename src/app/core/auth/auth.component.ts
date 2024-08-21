import { AuthService } from './auth.service';
import { Component } from '@angular/core';
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
  constructor(private authService: AuthService, private router: Router) {}

  isLogin: boolean = false;
  matched!: boolean | null;
  value: any = null;
  showpassword: boolean = false;

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
