import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loadHome, loadHomeSuccess, loadHomeFailure } from './home.actions';
import { of } from 'rxjs';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store) {}

  // loadHome$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadHome),
  //     switchMap(() => {
  //       return of({ title: 'Dummy Home Data', content: 'This is dummy content for home.' }).pipe( // Dummy data
  //         map((data) => loadHomeSuccess({ data })),
  //         catchError((error) => {
  //           return of(loadHomeFailure({ error }));
  //         })
  //       );
  //     })
  //   );
  // });
}
