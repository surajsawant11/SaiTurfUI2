import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { authReducer } from './store/reducers/auth/auth.reducer';
import { AuthEffects } from './store/effects/auth/auth.effects';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { turfCollectionReducer } from './features/dashboard/turf-collections/store/turf-collections.reducer';
import { TurfCollectionEffects } from './features/dashboard/turf-collections/store/turf-collections.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer, turf: turfCollectionReducer}),
    provideEffects([AuthEffects, TurfCollectionEffects]),
    provideHttpClient(
      withInterceptors([tokenInterceptor]),
      withInterceptorsFromDi(),
    ),
    provideAnimations(), // Required for ngx-toastr
    provideToastr(), // Configure Toastr,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    MatDialogModule
  ],
};
