import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.getUser();
  const expectedRole = route.data?.['role'];   

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole && user?.role !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
