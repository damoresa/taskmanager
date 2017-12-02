import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;

        return this.checkAuth(url);
    }

    private checkAuth(url: string): boolean {
        const authed: boolean = this.authService.isAuthed();

        if (!authed) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}
