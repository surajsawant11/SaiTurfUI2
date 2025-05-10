import { createReducer, on } from '@ngrx/store';
import * as TurfActions from './turf.actions';

export interface TurfState {
  turfs: any[];   // ✅ Changed 'turf' to 'turfs' for clarity
  loading: boolean;
  error: string | null;
  saveSuccess: boolean;  
  deleteSuccess: boolean;
}

export const initialState: TurfState = {
  turfs: [],  // ✅ Ensure consistency
  loading: false,
  error: null,
  saveSuccess: false,  
  deleteSuccess: false, 
};

export const turfReducer = createReducer(
  initialState,

  // ✅ Load Turf Actions
  on(TurfActions.loadTurf, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TurfActions.loadTurfSuccess, (state, { turfs }) => ({
    ...state,
    turfs,  // ✅ Assigning to correct key
    loading: false
  })),

  on(TurfActions.loadTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ✅ Save Turf Actions
  on(TurfActions.saveTurf, (state) => ({
    ...state,
    loading: true,
    saveSuccess: false // Reset before saving
  })),

  on(TurfActions.saveTurfSuccess, (state) => ({
    ...state,
    loading: false,
    saveSuccess: true
  })),

  on(TurfActions.saveTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    saveSuccess: false,
    error
  })),

  // ✅ Delete Turf Actions
  on(TurfActions.deleteTurf, (state) => ({
    ...state,
    loading: true,
    deleteSuccess: false // Reset before deleting
  })),

  on(TurfActions.deleteTurfSuccess, (state, { turfId }) => ({
    ...state,
    loading: false,
    deleteSuccess: true,
    turfs: state.turfs.filter(turf => turf.id !== turfId) // ✅ Removing deleted turf
  })),

  on(TurfActions.deleteTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    deleteSuccess: false,
    error
  }))
);
