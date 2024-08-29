import { Component, ElementRef, output, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userCreationData } from '../../shared/userData.model';
import { UsersService } from '../../core/user-pages/users.service';
import { customEmailValidator } from '../../core/auth/email.validator';
import { JsonPipe } from '@angular/common';
import { userKey } from '../../core/user-pages/userKey';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent {
  [x: string]: any;
  constructor(private usersService: UsersService) {}

  pushUser = output<userCreationData>();
  loading: boolean = false;

  @ViewChild('modal') modalElement!: ElementRef;

  backdropElement!: any;

  userData: userCreationData[] = [];
  createUserData = new FormGroup({
    User_Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      customEmailValidator(),
    ]),
    First_Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    Last_Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    Phone_Number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}$'),
    ]),
    gender: new FormControl('male', [Validators.required]),
  });
  CreateData = {
    email: this.createUserData.value.email!,
    First_Name: this.createUserData.value.First_Name!,
    gender: this.createUserData.value.gender!,
    id: '',
    Last_Name: this.createUserData.value.Last_Name!,
    Phone_Number: this.createUserData.value.Phone_Number!,
    User_Name: this.createUserData.value.User_Name!,
  };

  createData() {
    if (this.createUserData.invalid) {
      return;
    } else {
      this.loading = true;
      this.usersService
        .createUser({
          email: this.createUserData.value.email!,
          First_Name: this.createUserData.value.First_Name!,
          gender: this.createUserData.value.gender!,
          id: '',
          Last_Name: this.createUserData.value.Last_Name!,
          Phone_Number: this.createUserData.value.Phone_Number!,
          User_Name: this.createUserData.value.User_Name!,
        })
        .subscribe({
          next: (data: userKey) => {
            this.loading = false;
            this.pushUser.emit({
              email: this.createUserData.value.email!,
              First_Name: this.createUserData.value.First_Name!,
              gender: this.createUserData.value.gender!,
              id: data.name,
              Last_Name: this.createUserData.value.Last_Name!,
              Phone_Number: this.createUserData.value.Phone_Number!,
              User_Name: this.createUserData.value.User_Name!,
            });
            this.clearData();
          },
          error: (err) => {
            this.loading = false;
          },
        });
    }
  }

  get userName() {
    return this.createUserData.get('User_Name')!;
  }
  get email() {
    return this.createUserData.get('email')!;
  }
  get firstName() {
    return this.createUserData.get('First_Name')!;
  }
  get lastName() {
    return this.createUserData.get('Last_Name')!;
  }
  get phoneNumber() {
    return this.createUserData.get('Phone_Number')!;
  }
  get gender() {
    return this.createUserData.get('gender')!;
  }

  clearData() {
    this.modalElement.nativeElement.style.display = 'none';

    document.body.classList.remove('modal-open');

    document.body.style.cssText = '';

    const backgroundElement = document.getElementById('staticBackdrop');

    if (backgroundElement && backgroundElement.classList.contains('show')) {
      backgroundElement.classList.remove('show');
      backgroundElement.removeAttribute('aria-modal');
      backgroundElement.removeAttribute('role');
      backgroundElement.setAttribute('aria-hidden', 'true');
    }
    this.backdropElement = document.getElementsByClassName('modal-backdrop');
    if (this.backdropElement) {
      this.backdropElement[0].remove();
    }
    // Reset the form group
    this.createUserData.reset(
      {
        User_Name: '',
        email: '',
        First_Name: '',
        Last_Name: '',
        Phone_Number: '',
        gender: 'male',
      },
      {
        emitEvent: true,
      }
    );

    // Clear all errors
    this.createUserData.clearValidators();
    this.createUserData.updateValueAndValidity();
  }

  
  checkValueIsExist(fieldName: string, errorName: any) {
    const fieldControl = this.createUserData.get(fieldName);
    const fieldValue = fieldControl?.value;

    this.usersService.users.subscribe({
      next: (users: any) => {
        for (const key in users) {
          const user = users[key];
          console.log(user[fieldName]);
          console.log(fieldValue);
          if (user[fieldName] === fieldValue) {
            fieldControl?.setErrors({ [errorName]: true });
          } else {
            fieldControl?.setErrors(null);
          }
        }
      },
    });
  }
}
