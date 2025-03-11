import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ErrorHandlerService } from '../services/error-handler.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const errorHandler = inject(ErrorHandlerService);
  const token = authService.getToken();

  if (token && !req.url.includes('/auth/login')) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned).pipe(
      catchError(error => {
        if (error.status === 401) {
          authService.logout();
        }
        errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError(error => {
      errorHandler.handleError(error);
      return throwError(() => error);
    })
  );
}; 