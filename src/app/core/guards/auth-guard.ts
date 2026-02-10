import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/storedKey';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    if (localStorage.getItem(STORED_KEYS.userToken)) {
      return true;
    }
  }

return router.parseUrl('/login')

};
