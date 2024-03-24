import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToastUtilsService {
  private toastSubject = new Subject<{ type: string; message: string }>();

  toastSubject$ = this.toastSubject.asObservable();

  callback(type: string, message: string) {
    this.toastSubject.next({ type, message });
  }
}
