import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as BookActions from './booking.actions';
import { BookingService } from '../service/booking.service';

@Injectable()
export class BookEffects {
  private actions$ = inject(Actions);
  private _bookingService = inject(BookingService);

  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBookings),
      exhaustMap(() =>
        this._bookingService.getBookings().pipe(
          map((bookings) => BookActions.loadBookingsSuccess({ bookings })),
          catchError((error) => {
            return [BookActions.loadBookingsFailure({ error: error.message || 'Unknown error' })];
          })
        )
      )
    );
  });

  loadBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBook),
      exhaustMap((action) =>
        this._bookingService.getBookingById(action.bookingId).pipe(
          map((book) => BookActions.loadBookSuccess({ book })),
          catchError((error) => {
            return [BookActions.loadBookFailure({ error: error.message || 'Unknown error' })];
          })
        )
      )
    );
  });
}
