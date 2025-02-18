import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure } from '../../core/store/auth.actions';
import { User } from '../store/auth.interface';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
    };

    return this.http
      .post(`${this.apiUrl}/login`, body, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .pipe(
        switchMap((loginResponse: any) => {
          if (loginResponse.token) {
            this.setUserContextToken(loginResponse.token);
            this.setLoginTimestamp();
            return this.getUserContext().pipe(
              tap((userContext) => {
                this.setUserToStorage(userContext);
                this.store.dispatch(loginSuccess({ user: userContext }));
              })
            );
          } else {
            this.store.dispatch(loginFailure({ error: 'No token returned' }));
            return of(null);
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          this.store.dispatch(loginFailure({ error }));
          return of(null);
        })
      );
  }

  setUserContextToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  setLoginTimestamp(): void {
    const timestamp = new Date().getTime();
    localStorage.setItem('loginTimestamp', timestamp.toString());
  }

  isAuthenticated(): boolean {
    const timestamp = localStorage.getItem('loginTimestamp');
    if (timestamp) {
      const loginTime = parseInt(timestamp, 10);
      const currentTime = new Date().getTime();
      const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);
      if (hoursSinceLogin < 24) {
        return true;
      }
    }
    this.clearLocalStorage();
    return false;
  }

  getUserContext(): Observable<User | any> {
    const token = localStorage.getItem('userToken');
    if (token) {
      return this.http.get<User>(`${this.apiUrl}/userContext`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } else {
      return of(null);
    }
  }

  private setUserToStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
