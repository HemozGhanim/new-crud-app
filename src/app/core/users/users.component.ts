import { Component } from '@angular/core';
import { AddUserModalComponent } from '../../feature/add-user-modal/add-user-modal.component';
import { UserCardComponent } from '../../feature/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AddUserModalComponent, UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: '+jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Johnson', email: 'tet@example.com' },
  ];
}
