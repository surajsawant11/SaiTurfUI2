import { createReducer, on } from '@ngrx/store';
import { loadHome, loadHomeSuccess, loadHomeFailure } from './home.actions';

export interface HomeState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

export const homeReducer = createReducer(
  initialState,
  on(loadHome, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadHomeSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(loadHomeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
