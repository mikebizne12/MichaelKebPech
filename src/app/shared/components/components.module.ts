import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    ModalConfirmComponent,
    ToastComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    ModalConfirmComponent,
    ToastComponent,
  ],
})
export class ComponentsModule {}
