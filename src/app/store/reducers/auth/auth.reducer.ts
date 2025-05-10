import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../actions/auth/auth.actions';
import { User } from '../../interface/auth/auth.interface';

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
  })),
  on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error, loading: false }))

);
