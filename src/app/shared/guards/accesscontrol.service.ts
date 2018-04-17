import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../../store/state';
import { Router } from '@angular/router';

@Injectable()
export class AccessControlGuard implements CanActivate {

    loggedIn: boolean = false;

    constructor(private store: Store<AppState>, private router: Router) {
        this.store.select((state: AppState) => {
            return state.user
        }).subscribe((user: UserState) => {
            this.loggedIn = user.loggedIn;
        });
    }

    // canActivate gets fired activated on loading of the parent route and once on the hard reload of any child routes
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!this.loggedIn && !state.url.includes('login')){
            this.router.navigate(['/login']);
        } else {
            return true;
        }
    }     
}