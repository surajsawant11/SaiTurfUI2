import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TurfState } from './turf.reducer';

export const selectTurfState = createFeatureSelector<TurfState>('turf');

export const selectTurfs = createSelector(
  selectTurfState,
  (state: TurfState) => state.turf
);

export const selectTurfLoading = createSelector(
  selectTurfState,
  (state: TurfState) => state.loading
);

export const selectTurfError = createSelector(
  selectTurfState,
  (state: TurfState) => state.error
);
