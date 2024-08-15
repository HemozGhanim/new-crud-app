import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'new-crud-app';
}
