import { createAction, props } from '@ngrx/store';

export const loadTurf = createAction('[Turf] Load Turf');
export const loadTurfSuccess = createAction('[Turf] Load Turf Success', props<{ turfs: any }>());
export const loadTurfFailure = createAction('[Turf] Load Turf Failure', props<{ error: any }>());

export const saveTurf = createAction('[Turf] Save Turf', props<{ formData: FormData }>());
export const saveTurfSuccess = createAction('[Turf] Save Turf Success');
export const saveTurfFailure = createAction('[Turf] Save Turf Failure', props<{ error: any }>());

export const deleteTurf = createAction('[Turf] Delete Turf', props<{ turfId: number }>());
export const deleteTurfSuccess = createAction('[Turf] Delete Turf Success', props<{ turfId: number }>());
export const deleteTurfFailure = createAction('[Turf] Delete Turf Failure', props<{ error: string }>());
