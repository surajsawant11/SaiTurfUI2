import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginlog = false;
  constructor() { }

  isLogin(username: string, password: string) {
    // Here you can use real HTTP logic, e.g., this.http.post() to check credentials
    console.log('Attempting login with:', username, password);

    // Simulate success or failure based on hardcoded credentials for demonstration
    if (username === 'admin' && password === '123') {
      // Return observable that emits true for successful login
      this.isLoginlog =true;
      return of(true).pipe(delay(1000));  // Simulate network delay with delay operator
    } else {
      // Return observable that emits false for failed login
      return of(false).pipe(delay(1000));  // Simulate network delay with delay operator
    }
  }

  isLogout(){
    this.isLoginlog = false;
  }

  isAuthenticated():boolean{
    return this.isLoginlog;
  }

}
