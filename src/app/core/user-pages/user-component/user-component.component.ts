import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { userCreationData } from '../../../shared/userData.model';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.scss',
})
export class UserComponentComponent implements OnInit {
  id!: any;
  userData!: userCreationData;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
      },
    });
    this.usersService.getUserById(this.id).subscribe({
      next: (users: any) => {
        for (const key in users) {
          if (users[key].id == this.id) {
            this.userData = users[key];
          }
        }
      },
    });
  }
  goBack() {
    this.location.back();
  }
  OnClickEdit(userId: number) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
