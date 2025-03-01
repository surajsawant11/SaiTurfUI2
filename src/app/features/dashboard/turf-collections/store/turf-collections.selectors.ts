import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TurfCollectionState } from './turf-collections.reducer';

export const selectTurfState = createFeatureSelector<TurfCollectionState>('turf');

export const selectTurfs = createSelector(
  selectTurfState,
  (state: TurfCollectionState) => state.turfs
);

export const selectTurfLoading = createSelector(
  selectTurfState,
  (state: TurfCollectionState) => state.loading
);

export const selectTurfError = createSelector(
  selectTurfState,
  (state: TurfCollectionState) => state.error
);

export const selectBookedDates = createSelector(
  selectTurfState,
  (state: TurfCollectionState) => state.bookedDates
);

// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { BookingState } from './booking.reducer';

// Get the feature state
export const selectBookingState = createFeatureSelector<TurfCollectionState>('booking');

// Get the bookings list from the state
export const selectAllBookings = createSelector(selectBookingState, (state) => state.bookings);

// Get any error messages
export const selectBookingError = createSelector(selectBookingState, (state) => state.error);

