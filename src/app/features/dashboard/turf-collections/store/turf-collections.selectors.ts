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


