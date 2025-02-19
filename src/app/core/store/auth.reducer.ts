import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.interface';

export interface AuthStateInterface {
  user: User | null;
  error: string | null;
}

export const initialState: AuthStateInterface = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  }))
);
