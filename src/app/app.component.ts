import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AuthService } from './core/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { UsersService } from './core/user-pages/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
})
export class AppComponent implements OnInit {
  isSmallScreen: boolean = false;
  sideBarWidth!: number;
  //constructor
  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
  handleSideBarWidth(sideBarChildWidth: number) {
    this.sideBarWidth = sideBarChildWidth;
  }
}
