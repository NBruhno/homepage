import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class PermGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.user
            .take(1)
            .map(user => _.get(user, 'admin') === true)
            .do(admin => {
                if (!admin) {
                    console.log(_.has(admin, 'admin'));
                    console.log('Access Denied! (Not an administrator)');
                    this.snack.open('You are not authorized to access this page', '', { duration: 4000 });
                    this.router.navigate(['/']);
                }
            });
    }
}
