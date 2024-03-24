import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const token = '1';
    const authReq = req.clone({
      setHeaders: { authorId: `${token}` },
    });

    return next.handle(authReq);
  }
}
