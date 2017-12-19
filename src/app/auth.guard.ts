import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService} from './auth.service';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.user
            .take(1)
            .map(user => !!(user && user.completeProfile) )
            .do(loggedIn => {
                if (!loggedIn) {
                    this.snack.open('You must be logged in and your profile updated to access this page', '', { duration: 4000 });
                    this.router.navigate(['/login']);
                }
            });
    }
}
