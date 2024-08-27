import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authServie = inject(AuthService);
  return authServie.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        let modifiedReq = req.clone({
          params: req.params.set('key', environment.apiKey ?? ''),
        });
        return next(modifiedReq);
      } else {
        let modifiedReq = req.clone({
          params: req.params.set('auth', user.token ?? ''),
        });
        return next(modifiedReq);
      }
    })
  );
};
