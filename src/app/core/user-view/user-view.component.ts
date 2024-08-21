import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AddUserModalComponent } from '../../feature/add-user-modal/add-user-modal.component';
import { UserCardComponent } from '../../feature/user-card/user-card.component';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [AddUserModalComponent, UserCardComponent, RouterModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent {
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: '+jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Johnson', email: 'tet@example.com' },
  ];

  constructor(private router: Router) {}
  OnClickUser(userId: number) {
    this.router.navigate(['users', userId]);
  }
}
