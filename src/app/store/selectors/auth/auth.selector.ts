import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../../reducers/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthStateInterface>('auth');
export const selectAuthUser = createSelector(selectAuthState, (authState: AuthStateInterface) => authState.user);
export const selectAuthError = createSelector(selectAuthState, (authState: AuthStateInterface) => authState.error);