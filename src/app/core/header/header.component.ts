import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
// import { SidebarModule, DropdownModule } from 'ng-cdbangular';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatSidenavModule],
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

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}
