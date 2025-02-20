import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../actions/auth/auth.actions';
import { Router } from '@angular/router';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private _authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password }) =>
        this._authService.login(username, password).pipe(
          map(user => {
            // Store user data in the context and local storage
            this._authService.setUserContextToken(user.token);
            this._authService.setLoginTimestamp();
            this._authService.setUserToStorage(user);

            // Navigate to home path
            this.router.navigate(['/']);

            // Dispatch login success action
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            // Dispatch login failure action
            return of(AuthActions.loginFailure({ error: error.message || 'Unknown error' }));
          })
        )
      )
    )
  );
}
