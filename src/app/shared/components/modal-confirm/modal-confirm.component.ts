import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent {
  @Input() productName: string | null = null;
  @Output() confirmed = new EventEmitter<boolean>();
  show: boolean = false;

  handleConfirm(confirm: boolean) {
    this.confirmed.emit(confirm);
  }
  handleToggleModal() {
    this.show = !this.show;
  }
}
