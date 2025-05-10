import { createAction, props } from '@ngrx/store';

export const loadBookings = createAction('[Book] Load Book');
export const loadBookingsSuccess = createAction('[Book] Load Book Success', props<{ bookings: any }>());
export const loadBookingsFailure = createAction('[Book] Load Book Failure', props<{ error: any }>());

// by id
export const loadBook = createAction('[Book] Load Book By Id', props<{ bookingId: any }>());
export const loadBookSuccess = createAction('[Book] Load Book By Id Success', props<{ book: any }>());
export const loadBookFailure = createAction('[Book] Load Book By Id Failure', props<{ error: any }>());
