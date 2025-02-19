import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/auth.interface';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true, })
  }

  setUserContextToken(token: string): void {
    localStorage.setItem('token', token);
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

  public setUserToStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  public getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('user');
  }
  logOut(): void {
    this.clearLocalStorage();
  }
}
