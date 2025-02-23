import { createAction, props } from '@ngrx/store';

export const loadTurf = createAction('[Turf] Load Turf');
export const loadTurfSuccess = createAction('[Turf] Load Turf Success', props<{ turf: any }>());
export const loadTurfFailure = createAction('[Turf] Load Turf Failure', props<{ error: any }>());
