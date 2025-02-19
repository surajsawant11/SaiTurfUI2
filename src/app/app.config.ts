import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { AppErrorHandler } from './core/guards/auth.error.interceptor';
import { authInterceptor } from './core/guards/auth.interceptor';
import { AuthEffects } from './core/store/auth.effects';
import { authReducer } from './core/store/auth.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
};
