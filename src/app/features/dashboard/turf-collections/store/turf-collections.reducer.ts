import { createReducer, on } from '@ngrx/store';
import * as TurfCollectionActions from './turf-collections.actions';
import { Booking } from '../turf-collections-detail/turf-collections-detail.component';

export interface TurfCollectionState {
  turfs: any[];   // ✅ Changed 'turf' to 'turfs' for clarity
  loading: boolean;
  error: string | null;
  saveSuccess: boolean;  
  deleteSuccess: boolean;
  bookedDates: string[];
  bookings: Booking[];
}

export const initialState: TurfCollectionState = {
  turfs: [],  // ✅ Ensure consistency
  loading: false,
  error: null,
  saveSuccess: false,  
  deleteSuccess: false, 
  bookedDates: [],
  bookings: []
};

export const turfCollectionReducer = createReducer(
  initialState,

  // ✅ Load Turf Actions
  on(TurfCollectionActions.loadTurfCollections, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TurfCollectionActions.loadTurfCollectionsSuccess, (state, { turfs }) => ({
    ...state,
    turfs,  // ✅ Assigning to correct key
    loading: false
  })),

  on(TurfCollectionActions.loadTurfCollectionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TurfCollectionActions.loadBookedDates, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TurfCollectionActions.loadBookedDatesSuccess, (state, { bookedDates }) => ({
    ...state,
    bookedDates, // ✅ Save booked dates in state
    loading: false
  })),

  on(TurfCollectionActions.loadBookedDatesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
    on(TurfCollectionActions.createBookingSuccess, (state, { booking }) => ({
      ...state,
      bookings: [...state.bookings, booking]
    })),
    on(TurfCollectionActions.createBookingFailure, (state, { error }) => ({ ...state, error }))
 
);
