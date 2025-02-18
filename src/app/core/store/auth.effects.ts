import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService, 
    private store: Store
  ) {}

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.login),
  //     mergeMap(action =>
  //       this.authService.login(action.username, action.password).pipe(
  //         map(user => AuthActions.loginSuccess({ user })),
  //         catchError(error => of(AuthActions.loginFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );
}
