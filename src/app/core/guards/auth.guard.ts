import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated(); // Implement this method in AuthService

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  const isAdmin = authService.getUserFromStorage()?.role === 'admin'; // Check if the user is an admin

  if (!isAdmin) {
    // Optionally, redirect to an unauthorized page
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
