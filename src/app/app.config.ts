import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  ROUTER_CONFIGURATION,
  RouterModule,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: true } },
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
};
