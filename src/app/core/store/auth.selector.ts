import { createSelector } from "@ngrx/store";

// 1. Define AuthStateInterface
export interface AuthStateInterface {
  user: any | null; // Assuming User is an interface for the user data
  error: string | null;
}

// 2. Define AppStateInterface which only includes the auth state
export interface AppStateInterface {
  auth: any;
}

export const selectAuthState = (state: any) => state.auth;

export const userSelector = createSelector(
  selectAuthState,
  (authState) => authState.user // Adjust based on your state structure
);

