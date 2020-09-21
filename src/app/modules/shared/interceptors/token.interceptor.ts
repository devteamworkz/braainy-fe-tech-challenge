import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.set('Content-Type', 'application/json');

    headers = headers.set('X-Access-Token', '749f6c0f873eb98f16257eec9baa47c944617d34');

    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      map((event) => {
        if (event instanceof HttpErrorResponse) {
          if (event.status === 401) {
            // handle
          }

          this.notificationsService.error(event.error.errorMessage);
        }

        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // handle
        }

        this.notificationsService.error(err.error.errorMessage);

        throw err;
      })
    );
  }
}
