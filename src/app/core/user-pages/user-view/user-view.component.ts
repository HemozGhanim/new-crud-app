import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddUserModalComponent } from '../../../feature/add-user-modal/add-user-modal.component';
import { UserCardComponent } from '../../../feature/user-card/user-card.component';
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
    this.usersService.getUsers().subscribe();
    this.userSub = this.usersService.users.subscribe({
      next: (users: any) => {
        if (!users) {
          return;
        }
        this.users = Object.keys(users).map((key) => ({
          ...users[key],
          id: key,
        }));
        console.log(this.users);
      },
    });
  }
  OnClickUser(userId: string) {
    this.router.navigate(['users', userId]);
  }
  onPushUser(data: any) {
    this.users?.push(data);
    console.log(this.users);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
