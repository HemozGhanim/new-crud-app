import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonPipe, Location } from '@angular/common';
import { userCreationData } from '../../../shared/userData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Subscription, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { customEmailValidator } from '../../auth/email.validator';

@Component({
  selector: 'app-user-edit-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './user-edit-component.component.html',
  styleUrl: './user-edit-component.component.scss',
})
export class UserEditComponentComponent implements OnInit, OnDestroy {
  id!: any;
  userData!: userCreationData | null;
  userByIdSub!: Subscription;
  disabled: boolean = true;
  private ChangedDataSub!: Subscription;

  formUserData = new FormGroup({
    id: new FormControl(''),
    User_Name: new FormControl(this.userData?.User_Name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(this.userData?.email, [
      Validators.required,
      Validators.email,
      customEmailValidator(),
    ]),
    First_Name: new FormControl(this.userData?.First_Name, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    Last_Name: new FormControl(this.userData?.Last_Name, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    Phone_Number: new FormControl(this.userData?.Phone_Number, [
      Validators.required,
      Validators.pattern('^[0-9]{11}$'),
    ]),
    gender: new FormControl(this.userData?.gender, [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private tosetr: ToastrService
  ) {}
  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: (params) => {
    //     this.id = params['id'];
    //   },
    // });
    // this.userData = history.state.data;
    // if (this.userData) {
    //   this.userData.id = this.id;
    // }
    // this.formUserData.patchValue({
    //   User_Name: this.userData?.User_Name,
    //   email: this.userData?.email,
    //   First_Name: this.userData?.First_Name,
    //   Last_Name: this.userData?.Last_Name,
    //   Phone_Number: this.userData?.Phone_Number,
    //   gender: this.userData?.gender,
    //   id: this.id,
    // });
    this.userByIdSub = this.route.params
      .pipe(
        switchMap((params) => {
          this.id = params['id'];
          return this.usersService.getUsers();
        }),
        switchMap((users) => {
          return this.usersService.getUserById(this.id);
        })
      )
      .subscribe({
        next: (user: any) => {
          this.userData = user;
          if (this.userData) {
            this.userData.id = this.id;
          }
          this.formUserData.patchValue({
            User_Name: this.userData?.User_Name,
            email: this.userData?.email,
            First_Name: this.userData?.First_Name,
            Last_Name: this.userData?.Last_Name,
            Phone_Number: this.userData?.Phone_Number,
            gender: this.userData?.gender,
            id: this.id,
          });
        },
        error: (err) => {
          this.tosetr.error('Error:', err);
        },
      });

    this.ChangedDataSub = this.formUserData.valueChanges.subscribe(
      (changes) => {
        if (this.formUserData.dirty && this.formUserData.valid) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
        if (
          this.userData?.id == this.formUserData.value.id &&
          this.userData?.User_Name == this.formUserData.value.User_Name &&
          this.userData?.email == this.formUserData.value.email &&
          this.userData?.First_Name == this.formUserData.value.First_Name &&
          this.userData?.Last_Name == this.formUserData.value.Last_Name &&
          this.userData?.Phone_Number == this.formUserData.value.Phone_Number &&
          this.userData?.gender == this.formUserData.value.gender
        ) {
          this.disabled = true;
        }
      }
    );
  }

  get userName() {
    return this.formUserData.get('User_Name')!;
  }
  get email() {
    return this.formUserData.get('email')!;
  }
  get firstName() {
    return this.formUserData.get('First_Name')!;
  }
  get lastName() {
    return this.formUserData.get('Last_Name')!;
  }
  get phoneNumber() {
    return this.formUserData.get('Phone_Number')!;
  }
  get gender() {
    return this.formUserData.get('gender')!;
  }
  goBack() {
    this.router.navigate(['users', this.id], {
      state: { data: this.formUserData.value },
    });
  }

  submitForm() {
    if (
      this.userData?.id == this.formUserData.value.id &&
      this.userData?.User_Name == this.formUserData.value.User_Name &&
      this.userData?.email == this.formUserData.value.email &&
      this.userData?.First_Name == this.formUserData.value.First_Name &&
      this.userData?.Last_Name == this.formUserData.value.Last_Name &&
      this.userData?.Phone_Number == this.formUserData.value.Phone_Number &&
      this.userData?.gender == this.formUserData.value.gender
    ) {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.usersService.updateUser(this.id, this.formUserData.value).subscribe({
        next: (res) => {
          this.disabled = true;
          this.router.navigate(['users', this.id], {
            state: { data: this.formUserData.value },
          });
        },
      });
    }
  }
  deleteUser() {
    this.usersService.deleteUser(this.id).subscribe({
      next: (res) => {
        this.router.navigate(['users']);
      },
    });
  }
  ngOnDestroy(): void {
    this.ChangedDataSub.unsubscribe();
  }
}
