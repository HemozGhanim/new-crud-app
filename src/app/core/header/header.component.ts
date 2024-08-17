import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authUserSub!: Subscription;
  isAuth: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authUserSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}
