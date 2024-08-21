import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.scss',
})
export class UserComponentComponent implements OnInit {
  id!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = +params['id'];
      },
    });
  }
  goBack() {
    this.location.back();
  }
  // getId() {
  //   this.id =
  // }
}
