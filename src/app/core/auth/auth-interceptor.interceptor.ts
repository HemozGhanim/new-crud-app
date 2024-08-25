import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authServie = inject(AuthService);
  return authServie.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      } else {
        let modifiedReq = req.clone({
          params: req.params.set('auth', user.token ?? ''),
        });
        return next(modifiedReq);
      }
    })
  );
};
