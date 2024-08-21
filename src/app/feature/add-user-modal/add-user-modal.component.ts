import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { userCreationData } from '../../shared/userData.model';
import { UsersService } from '../../core/user-pages/users.service';

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
    id: new FormControl<number | null>(null),
    User_Name: new FormControl(''),
    email: new FormControl(''),
    First_Name: new FormControl(''),
    Last_Name: new FormControl(''),
    Phone_Number: new FormControl(''),
    gender: new FormControl('male'),
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
        console.log(data);
      });
    console.log(this.createUserData.value);
  }
  clearData() {
    this.createUserData.reset();
  }
}
