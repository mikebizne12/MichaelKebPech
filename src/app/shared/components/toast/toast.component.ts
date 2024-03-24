import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastUtilsService } from '@core/services/toast-utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  message: string = '';
  show: boolean = false;
  toastClass: string = '';
  subscription: Subscription | undefined;

  constructor(private toastUtilsService: ToastUtilsService) {}

  ngOnInit() {
    this.subscription = this.toastUtilsService.toastSubject$.subscribe(
      ({ type, message }: { type: string; message: string }) => {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 3000);
        this.toastClass = type;
        this.message = message;
      },
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
