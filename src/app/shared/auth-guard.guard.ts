import { CanActivateFn } from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree,CanActivate,Router,} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise <boolean> |boolean => {
  const authService = inject(AuthServiceService);
  const router = inject(Router)
  if(authService.isLoggedIn !== true) {
    window.alert('Access not allowed!');
    router.navigate(['login']);
  }
  return true;
};
