import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const authGuard = (activatedRoute: ActivatedRouteSnapshot) => {
  return inject(AuthService)
    .checkUserRoles(activatedRoute.data['roles'])
    .pipe(
      map((isLoggedIn) =>
        isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login'])
      )
    );
};