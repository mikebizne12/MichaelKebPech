import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastUtilsService } from '@core/services/toast-utils.service';
import { toastTypes } from '@core/utils/const';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastUtilsService: ToastUtilsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  private errorHandler(
    error: HttpResponse<unknown>,
  ): Observable<HttpResponse<unknown>> {
    if (error.status === 401) {
      this.toastUtilsService.callback(toastTypes.ERROR, 'Sin autorización');
    }
    if (error.status === 403) {
      this.toastUtilsService.callback(toastTypes.ERROR, 'Prohibido');
    }
    if (error.status === 404) {
      this.toastUtilsService.callback(
        toastTypes.ERROR,
        'Recurso no encontrado',
      );
    }
    if (error.status === 422 || error.status === 400) {
      this.toastUtilsService.callback(
        toastTypes.ERROR,
        'Hubo un error al intentar realizar el proceso. Inténtelo más tarde.',
      );
    }
    if (error.status === 500) {
      this.toastUtilsService.callback(
        toastTypes.ERROR,
        'Error interno del servidor',
      );
    }

    throw error;
  }
}
