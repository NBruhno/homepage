import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {

    showSpinner = false;

    constructor(public auth: AuthService) {}

    toggleSpinner() {
        this.showSpinner = !this.showSpinner;
    }

    ngOnInit() {}
}
