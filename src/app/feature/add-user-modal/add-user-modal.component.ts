import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userCreationData } from '../../shared/userData.model';
import { UsersService } from '../../core/user-pages/users.service';
import { customEmailValidator } from '../../core/auth/email.validator';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent {
  constructor(private usersService: UsersService) {}

  createUserData = new FormGroup({
    id: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
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
      Validators.pattern('^[0-9]{10}$'),
    ]),
    gender: new FormControl('male', [Validators.required]),
  });

  createData() {
    this.usersService
      .createUser({
        email: this.createUserData.value.email!,
        First_Name: this.createUserData.value.First_Name!,
        gender: this.createUserData.value.gender!,
        id: +this.createUserData.value.id!,
        Last_Name: this.createUserData.value.Last_Name!,
        Phone_Number: this.createUserData.value.Phone_Number!,
        User_Name: this.createUserData.value.User_Name!,
      })
      .subscribe((data) => {
        this.usersService.getUsers().subscribe();
        console.log(data);
      });
    console.log(this.createUserData.value);
  }
  get userid() {
    return this.createUserData.get('id')!;
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
    this.createUserData.reset();
  }
}
