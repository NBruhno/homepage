import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { MzToastService } from 'ng2-materialize';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class PermGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private toastService: MzToastService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.user
            .take(1)
            .map(user => _.has(_.get(user, 'roles'), 'admin'))
            .do(authorized => {
                if (!authorized) {
                    console.log('route prevented!');
                    this.toastService.show('You are not authorized to access this page', 4000, 'red');
                    this.router.navigate(['/']);
                }
            });
    }
}
