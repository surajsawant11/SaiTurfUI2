import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { TurfCollectionService } from '../service/turf-collections.service';
import * as TurfActions from '../store/turf-collections.actions';
import { of } from 'rxjs';
import { environment } from '../../../../../environment/environment';

@Injectable()
export class TurfCollectionEffects {
  private actions$ = inject(Actions);
  private _turfCollectionService = inject(TurfCollectionService);

  loadTurfCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TurfActions.loadTurfCollections),
      exhaustMap(() =>
        this._turfCollectionService.loadTurfsCollections().pipe(
          map((turfs) => {
            // ✅ Modify imageUrl before storing it in the state
            const updatedTurfs = turfs.map(turf => ({
              ...turf,
              imageUrl: turf.imageUrl.startsWith('http') 
                ? turf.imageUrl 
                : `${environment.apiUrl}${turf.imageUrl}`
            }));
  
            return TurfActions.loadTurfCollectionsSuccess({ turfs: updatedTurfs });
          }),
          catchError((error) => {
            return [TurfActions.loadTurfCollectionsFailure({ error: error.message || 'Unknown error' })];
          })
        )
      )
    );
  });
  
  loadBookedDates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TurfActions.loadBookedDates),
      exhaustMap(action =>
        this._turfCollectionService.loadBookedDates(action.turfId).pipe(
          map((bookedDates) => TurfActions.loadBookedDatesSuccess({ bookedDates })),
          catchError((error) => of(TurfActions.loadBookedDatesFailure({ error: error.message || 'Unknown error' })))
        )
      )
    );
  });

  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TurfActions.createBooking),
      mergeMap(({ booking }) => {
        console.log("Inside Effect Before API Call:", booking.bookingDate);
        return this._turfCollectionService.createBooking(booking).pipe(
          mergeMap((newBooking) => [
            TurfActions.createBookingSuccess({ booking: newBooking }),
            TurfActions.loadBookedDates({ turfId: newBooking.turfId }) 
          ]),
          catchError((error) => of(TurfActions.createBookingFailure({ error: error.message })))
        );
      })
      
    )
  );
  
 

}
