import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message!: string;
  @Input() alertColor!: string;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModel() {
    this.closeModal.emit();
  }
}
