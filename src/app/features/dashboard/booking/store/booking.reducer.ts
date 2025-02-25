import { createReducer, on } from '@ngrx/store';
import { loadBookings, loadBookingsSuccess, loadBookingsFailure, loadBookFailure, loadBook, loadBookSuccess } from './booking.actions';

export interface BookState {
  bookings: any;
  loading: boolean;
  error: any;
  book: any;
}

export const initialState: BookState = {
  bookings: null,
  loading: false,
  error: null,
  book: null,
};

export const bookReducer = createReducer(
  initialState,
  on(loadBookings, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBookingsSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false,
  })),
  on(loadBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadBook, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBookSuccess, (state, { book }) => ({
    ...state,
    book,
    loading: false,
  })),
  on(loadBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
