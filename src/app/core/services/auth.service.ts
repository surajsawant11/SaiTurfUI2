import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure } from '../../core/store/auth.actions'; // Import your actions
import { User } from '../store/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
    };

    return this.http
      .post(`${this.apiUrl}/login`, body, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,  // This ensures cookies are included if needed
      })
      .pipe(
        // On success, save the token, call user context, and dispatch success action
        switchMap((loginResponse: any) => {
          if (loginResponse.token) {
            this.setUserContextToken(loginResponse.token); // Save token to storage
            this.setLoginTimestamp(); // Set the login timestamp
            return this.getUserContext().pipe(
              tap((userContext) => {
                this.setUserToStorage(userContext); // Save user context to local storage
                this.store.dispatch(loginSuccess({ user: userContext })); // Dispatch login success action
              })
            );
          } else {
            this.store.dispatch(loginFailure({ error: 'No token returned' }));
            return of(null); // If no token is received, return an observable with null
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          this.store.dispatch(loginFailure({ error }));
          return of(null); // Return null if login fails
        })
      );
  }

  // Save the token to localStorage
  setUserContextToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  // Set the login timestamp
  setLoginTimestamp(): void {
    const timestamp = new Date().getTime();
    localStorage.setItem('loginTimestamp', timestamp.toString());
  }

  // Check if the user is authenticated based on the timestamp
  isAuthenticated(): boolean {
    const timestamp = localStorage.getItem('loginTimestamp');
    if (timestamp) {
      const loginTime = parseInt(timestamp, 10);
      const currentTime = new Date().getTime();
      const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60); // Convert milliseconds to hours
      return hoursSinceLogin < 24; // Check if less than 24 hours have passed
    }
    return false; // No timestamp means not authenticated
  }

  // Call the userContext API with the token
  getUserContext(): Observable<User | any> {
    const token = localStorage.getItem('userToken');
    if (token) {
      return this.http.get<User>(`${this.apiUrl}/userContext`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } else {
      return of(null); // If no token, return null
    }
  }

  private setUserToStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
