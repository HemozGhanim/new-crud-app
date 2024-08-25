import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, ROUTER_CONFIGURATION } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { authInterceptorInterceptor } from './core/auth/auth-interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';
// import { AuthInterceptorService } from './core/auth/auth-interceptor-2.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: true } },
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptorInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(MatNativeDateModule),
    provideToastr(), // Toastr providers
  ],
};
