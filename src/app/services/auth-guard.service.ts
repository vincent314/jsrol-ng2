import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {FirebaseAuthState} from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn()
            .map((data:FirebaseAuthState) => {
                if (data) {
                    this.authService.user = data.auth;
                    return true;
                }
                this.authService.redirectUrl = state.url;
                this.router.navigate(['/login']);
                return false;
            })
            .take(1);
    }
}