import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './booking.reducer';

export const selectBookingState = createFeatureSelector<BookState>('book');

export const selectBookings = createSelector(selectBookingState, (state: BookState) => state.bookings);
export const selectBookingLoading = createSelector(selectBookingState, (state: BookState) => state.loading);
export const selectBookingError = createSelector(selectBookingState, (state: BookState) => state.error);

export const selectBook = createSelector(selectBookingState, (state: BookState) => state.book);
export const selectBookLoading = createSelector(selectBookingState, (state: BookState) => state.loading);
export const selectBookError = createSelector(selectBookingState, (state: BookState) => state.error);