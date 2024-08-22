import { AuthService } from './../auth/auth.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
// import { SidebarModule, DropdownModule } from 'ng-cdbangular';
// import { MatSidenavModule } from '@angular/material/sidenav';

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
  @ViewChild('sideBar', { static: true }) sideBar!: ElementRef;
  @Output() sideBarWidth = new EventEmitter<number>();

  //constructor
  constructor(private authService: AuthService, private ngZone: NgZone) {}
  ngOnInit(): void {
    this.authUserSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.ngZone.runOutsideAngular(() => {
      const sideBarWidth = this.getSideBarWidth();
      this.ngZone.run(() => {
        this.sideBarWidth.emit(sideBarWidth);
      });
    });
  }
  signOut() {
    this.authService.signOut();
  }
  getSideBarWidth(): number {
    const sideBarElement = this.sideBar.nativeElement;
    if (sideBarElement) {
      return sideBarElement.offsetWidth;
    }
    return 0;
  }
  detectSideBarWidth() {
    this.ngZone.runOutsideAngular(() => {
      const sideBarWidth = this.getSideBarWidth();
      this.ngZone.run(() => {
        this.sideBarWidth.emit(sideBarWidth);
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.detectSideBarWidth();
  }

  ngOnDestroy(): void {
    this.authUserSub.unsubscribe();
  }
}
