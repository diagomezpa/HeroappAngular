import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.services';
import { inject } from '@angular/core';

const checkPublicStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      console.log('Authenticated gard:', isAuthenticated);
    }),
    tap((isAuthenticated) => {
      console.log('hola isauth public' + isAuthenticated);
      if (isAuthenticated) {
        console.log('entrea public gard');
        router.navigate(['./']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuardPublic: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot // fotografia de como esta el router
) => {
  console.log({ route, state });

  return checkPublicStatus();
};

export const canMatchGuardPublic: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log({ route, segments });

  return checkPublicStatus();
};
