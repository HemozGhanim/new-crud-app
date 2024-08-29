import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { userCreationData } from '../../../shared/userData.model';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.scss',
})
export class UserComponentComponent implements OnInit {
  id!: any;
  userData!: userCreationData | null;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (!this.userData) {
      this.usersService.getUserById(this.id).subscribe({
        next: (data) => {
          this.loading = false;
          this.userData = data;
        },
      });
    } else {
      this.loading = false;
      this.userData = history.state.data;
    }
  }
  goBack() {
    this.router.navigate(['users']);
  }
  OnClickEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      state: { data: this.userData },
    });
  }
}
