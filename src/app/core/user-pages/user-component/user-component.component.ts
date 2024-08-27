import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { userCreationData } from '../../../shared/userData.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.scss',
})
export class UserComponentComponent implements OnInit {
  id!: any;
  userData!: userCreationData | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.id = params['id'];
          return this.usersService.checkUser(this.id);
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          console.log(typeof response);
          if (response === null) {
            console.log('User not found');
          }
        },
        error: (err) => {
          console.log('User not found 2');

          this.router.navigate(['**']);
        },
      });
    this.userData = history.state.data;
  }
  goBack() {
    this.router.navigate(['users']);
  }
  OnClickEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      state: { data: this.userData },
    });
  }
}
