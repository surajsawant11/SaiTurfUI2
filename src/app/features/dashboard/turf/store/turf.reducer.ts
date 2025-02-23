import { createReducer, on } from '@ngrx/store';
import * as TurfActions from './turf.actions';

export interface TurfState {
  turf: any[];   // List of turfs
  loading: boolean;
  error: string | null;
  saveSuccess: boolean;  // ✅ Add this field
}

export const initialState: TurfState = {
  turf: [],
  loading: false,
  error: null,
  saveSuccess: false  // ✅ Initialize it
};

export const turfReducer = createReducer(
  initialState,

  on(TurfActions.loadTurf, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TurfActions.loadTurfSuccess, (state, { turf }) => ({
    ...state,
    turf,
    loading: false
  })),

  on(TurfActions.loadTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ✅ Handle save actions
  on(TurfActions.saveTurf, (state) => ({
    ...state,
    loading: true,
    saveSuccess: false // Reset before saving
  })),

  on(TurfActions.saveTurfSuccess, (state) => ({
    ...state,
    loading: false,
    saveSuccess: true // Set to true on success
  })),

  on(TurfActions.saveTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    saveSuccess: false,
    error
  }))
);
