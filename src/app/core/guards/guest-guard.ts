import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/storedKey';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    if (localStorage.getItem(STORED_KEYS.userToken)) {
      return router.parseUrl('/home') ;
    }
  }

return true;
};
