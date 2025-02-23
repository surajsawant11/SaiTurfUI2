import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (state.url === '/login' || state.url === '/register') {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated(); // Check if the user is authenticated

  if (!isAuthenticated) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }

  const isAdmin = authService.getUserFromStorage()?.role === 'ADMIN'; // Check if the user is an admin

  if (!isAdmin) {
    router.navigate(['/unauthorized']); // Redirect to unauthorized if not an admin
    return false;
  }

  return true; // The user is authenticated and an admin
};