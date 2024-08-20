import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AuthService } from './core/auth/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isSmallScreen: boolean = false;
  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}
  private _formBuilder = inject(FormBuilder);
  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });
  ngOnInit(): void {
    this.authService.autoLogin();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
