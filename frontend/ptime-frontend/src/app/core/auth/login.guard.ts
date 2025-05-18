import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Si el usuario YA está logueado → redirige a dashboard
  return auth.isAuthenticated()
    ? router.createUrlTree(['/dashboard'])
    : true;                     // Si no, deja ver el login
};
