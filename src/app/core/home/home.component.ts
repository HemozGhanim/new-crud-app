import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../user-pages/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  authCheckSub!: Subscription;
  isAuth!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.authCheckSub = this.authService.user.subscribe((user: any) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.usersService.getUsers().subscribe();
  }

  toLogin() {
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.authCheckSub.unsubscribe();
  }
}
