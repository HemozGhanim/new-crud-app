import { Component, Input } from '@angular/core';
import { userCreationData } from '../../shared/userData.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input('userData') user!: userCreationData;
}
