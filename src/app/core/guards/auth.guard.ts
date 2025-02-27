import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// ✅ General Auth Guard (Only for Protected Routes)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']); // Redirect if not authenticated
    return false;
  }

  return true; // ✅ Allow if authenticated
};

// ✅ Role-Based Guard (Supports ADMIN & USER)
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUserFromStorage()?.role;
  const requiredRole = route.data?.['role'];

  if (userRole !== requiredRole) {
    router.navigate(['/unauthorized']); // Redirect unauthorized users
    return false;
  }

  return true; // ✅ Allow access if role matches
};

// ✅ NoAuth Guard (Prevents Auth Users from Accessing Login/Register)
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/']); // Redirect to home if authenticated
    return false;
  }
  return true; // ✅ Allow if not authenticated
};
