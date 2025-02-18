import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { HomeService } from '../service/home.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private homeService = inject(HomeService);

  loadHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeActions.loadHome),
      exhaustMap(() =>
        this.homeService.getPosts().pipe(
          map((data) => HomeActions.loadHomeSuccess({ data })),
          catchError((error) => {
            return [HomeActions.loadHomeFailure({ error: error.message || 'Unknown error' })];
          })
        )
      )
    );
  });
}
