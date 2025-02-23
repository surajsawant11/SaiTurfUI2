import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TurfService } from '../service/turf.service';
import * as TurfActions from './turf.actions';

@Injectable()
export class TurfEffects {
  private actions$ = inject(Actions);
  private _turfService = inject(TurfService);

  loadHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TurfActions.loadTurf),
      exhaustMap(() =>
        this._turfService.loadTurfs().pipe(
          map((turf) => TurfActions.loadTurfSuccess({ turf })),
          catchError((error) => {
            return [TurfActions.loadTurfFailure({ error: error.message || 'Unknown error' })];
          })
        )
      )
    );
  });
}
