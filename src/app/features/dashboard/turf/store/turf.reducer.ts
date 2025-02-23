import { createReducer, on } from '@ngrx/store';
import { loadTurf, loadTurfFailure, loadTurfSuccess } from './turf.actions';

export interface TurfState {
  turf: any;
  loading: boolean;
  error: any;
}

export const initialState: TurfState = {
  turf: null,
  loading: false,
  error: null,
};

export const turfReducer = createReducer(
  initialState,
  on(loadTurf, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadTurfSuccess, (state, { turf }) => ({
    ...state,
    turf,
    loading: false,
  })),
  on(loadTurfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
