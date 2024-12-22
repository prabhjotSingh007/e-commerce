import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenServiceService } from '../token-service/token-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tokenService: TokenServiceService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userToken = this.tokenService.getUserLogintoken();

    if (userToken !== null && userToken) {
      let loginRoute = route.url[0]?.path;
      if (loginRoute === 'login') {
        this.router.navigate(['/all-product']); // Redirect to home if logged in and trying to access login
        return false;
      }
      return true; // Allow activation of protected route
    } else {
      // If user is not logged in, redirect to login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
