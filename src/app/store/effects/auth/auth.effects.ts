import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../actions/auth/auth.actions';
import { Router } from '@angular/router';
import { exhaustMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
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
          map(data => {
            // Store user data in the context and local storage
            this._authService.setUserContextToken(data.token);
            this._authService.setLoginTimestamp();
            this._authService.setUserToStorage(data.user);

            // Navigate to home path
            this.router.navigate(['/']);

            // Dispatch login success action
            return AuthActions.loginSuccess({ user:data.user });
          }),
          catchError((error) => {
            // Dispatch login failure action
            return of(AuthActions.loginFailure({ error: error.message || 'Unknown error' }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => {
        this._authService.logOut();
        this.router.navigate(['/login']);
        return of(AuthActions.logoutSuccess());
      }),
      catchError((error) => {
        // Dispatch logout failure action
        return of(AuthActions.logoutFailure({ error: error.message || 'Unknown error' }));
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this._authService.register(action.username, action.email, action.password).pipe(
          map((user) => {
            this.router.navigate(['/login']);
            return AuthActions.registerSuccess({ user });
          }),
          catchError((error) => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );
}