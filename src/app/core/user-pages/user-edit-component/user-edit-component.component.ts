import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { userCreationData } from '../../../shared/userData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit-component',
  standalone: true,
  imports: [],
  templateUrl: './user-edit-component.component.html',
  styleUrl: './user-edit-component.component.scss',
})
export class UserEditComponentComponent {
  id!: any;
  userData!: userCreationData | null;
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
    this.userData = history.state.data;
  }
  goBack() {
    this.location.back();
  }
}
