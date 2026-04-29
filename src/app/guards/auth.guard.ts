import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.currentUser()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const sponsoredGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser();
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const producerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUser();
  if (!user || user.role !== 'PRODUCER') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
