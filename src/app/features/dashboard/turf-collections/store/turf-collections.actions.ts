import { createAction, props } from '@ngrx/store';

export const loadTurfCollections = createAction('[TurfCollections] Load Collections Turfs');
export const loadTurfCollectionsSuccess = createAction(
  '[TurfCollections] Load Turfs Collections Success',
  props<{ turfs: any[] }>()
);
export const loadTurfCollectionsFailure = createAction(
  '[TurfCollections] Load Turfs Collections Failure',
  props<{ error: any }>()
);

// import { createAction, props } from '@ngrx/store';

export const loadBookedDates = createAction(
  '[Turf Booking] Load Booked Dates',
  props<{ turfId: number }>()
);

export const loadBookedDatesSuccess = createAction(
  '[Turf Booking] Load Booked Dates Success',
  props<{ bookedDates: string[] }>()
);

export const loadBookedDatesFailure = createAction(
  '[Turf Booking] Load Booked Dates Failure',
  props<{ error: string }>()
);


