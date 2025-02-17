import { createAction, props } from '@ngrx/store';

export const loadHome = createAction('[Home] Load Home');
export const loadHomeSuccess = createAction(
  '[Home] Load Home Success',
  props<{ data: any }>()
);
export const loadHomeFailure = createAction(
  '[Home] Load Home Failure',
  props<{ error: any }>()
);
