import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TurfState } from './turf.reducer';

export const selectTurfState = createFeatureSelector<TurfState>('turf');

export const selectTurfs = createSelector(
  selectTurfState,
  (state: TurfState) => state.turfs
);

export const selectTurfLoading = createSelector(
  selectTurfState,
  (state: TurfState) => state.loading
);

export const selectTurfError = createSelector(
  selectTurfState,
  (state: TurfState) => state.error
);

// ✅ Add this selector to track save success
export const selectSaveTurfSuccess = createSelector(
  selectTurfState,
  (state: TurfState) => state.saveSuccess
);

export const selectDeleteTurfSuccess = createSelector(
  selectTurfState,
  (state: TurfState) => state.deleteSuccess
);

