import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TurfService } from '../service/turf.service';
import * as TurfActions from './turf.actions';

@Injectable()
export class TurfEffects {
  private actions$ = inject(Actions);
  private _turfService = inject(TurfService);

  // Load Turf List
  loadHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TurfActions.loadTurf),
      exhaustMap(() =>
        this._turfService.loadTurfs().pipe(
          map((turf) => TurfActions.loadTurfSuccess({ turf })),
          catchError((error) =>
            of(TurfActions.loadTurfFailure({ error: error.message || 'Unknown error' }))
          )
        )
      )
    );
  });

  // Save Turf (Handles Image Upload)
  saveTurf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TurfActions.saveTurf),
      exhaustMap((action) =>
        this._turfService.addTurf(action.formData).pipe(
          mergeMap(() => [
            TurfActions.saveTurfSuccess(),
            TurfActions.loadTurf()
          ]),
          catchError((error) => of(TurfActions.saveTurfFailure({ error })))
        )
      )
    )
  );

}
