import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

    constructor(private router: Router, public auth: AuthService) {
    }

    log() {
        console.log(_.has(_.get(this.auth.user, 'roles'), 'admin'));
    }

    signOut() {
        this.auth.signOut();
    }

    ngOnInit() {
    }

}
