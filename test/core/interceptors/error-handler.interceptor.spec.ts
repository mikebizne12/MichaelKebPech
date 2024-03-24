/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';

import { ToastUtilsService } from '@core/services/toast-utils.service';
import { toastTypes } from '@core/utils/const';
import { ErrorHandlerInterceptor } from '@core/interceptors/error-handler.interceptor';
import { throwError } from 'rxjs';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let toastUtilsService: ToastUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorHandlerInterceptor,
        ToastUtilsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(ErrorHandlerInterceptor);
    toastUtilsService = TestBed.inject(ToastUtilsService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle 401 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 401 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(
          toastTypes.ERROR,
          'Sin autorización'
        );
      }
    );
  });

  it('should handle 403 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 403 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(toastTypes.ERROR, 'Prohibido');
      }
    );
  });

  it('should handle 404 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 404 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(
          toastTypes.ERROR,
          'Recurso no encontrado'
        );
      }
    );
  });

  it('should handle 422 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 422 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(
          toastTypes.ERROR,
          'Hubo un error al intentar realizar el proceso. Inténtelo más tarde.'
        );
      }
    );
  });

  it('should handle 400 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 400 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(
          toastTypes.ERROR,
          'Hubo un error al intentar realizar el proceso. Inténtelo más tarde.'
        );
      }
    );
  });

  it('should handle 500 error', () => {
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');
    const errorResponse = new HttpResponse({ status: 500 });

    const httpHandler = {
      handle: () => {
        return throwError(errorResponse);
      },
    };

    interceptor.intercept(null as any, httpHandler).subscribe(
      () => {},
      () => {
        expect(callbackSpy).toHaveBeenCalledWith(
          toastTypes.ERROR,
          'Error interno del servidor'
        );
      }
    );
  });
});
