import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth';

/** Protects authenticated routes (e.g. /dashboard). */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasValidToken()) {
    return true;
  }

  // No token or expired token — clear stale state.
  authService.logout();

  return router.createUrlTree(['/login']);
};