import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddUserModalComponent } from '../../../feature/add-user-modal/add-user-modal.component';
import { UserCardComponent } from '../../../feature/user-card/user-card.component';
import { HttpClient } from '@angular/common/http';
import { userCreationData } from '../../../shared/userData.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [AddUserModalComponent, UserCardComponent, RouterModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit, OnDestroy {
  users!: userCreationData[] | null;
  userSub!: Subscription;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.userSub = this.usersService.users.subscribe({
      next: (users) => {
        for (const key in users) {
          this.users = Object.values(users);
        }
      },
    });
  }
  OnClickUser(userId: string) {
    this.router.navigate(['users', userId]);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
