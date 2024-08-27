import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddUserModalComponent } from '../../../feature/add-user-modal/add-user-modal.component';
import { UserCardComponent } from '../../../feature/user-card/user-card.component';
import { userCreationData } from '../../../shared/userData.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
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
  userData!: userCreationData | null;
  getUsers!: Subscription;
  loading: boolean = true;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.users = null;
    this.getUsers = this.usersService.getUsers().subscribe();
    this.userSub = this.usersService.users.subscribe({
      next: (users: any) => {
        if (!users) {
          return;
        }
        this.users = Object.keys(users).map((key) => ({
          ...users[key],
          id: key,
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  OnClickUser(userId: string) {
    this.userData = this.users?.find((user) => user.id === userId)!;
    this.router.navigate(['users', userId], {
      state: { data: this.userData },
    });
  }

  onPushUser(data: any) {
    this.users = [...(this.users || []), data];
  }
  ngOnDestroy(): void {
    this.getUsers.unsubscribe();
    this.userSub.unsubscribe();
  }
}
