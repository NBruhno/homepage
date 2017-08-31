import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public authService: AuthService) {}

    loginWithGoogle() {
        this.authService.loginWithGoogle();
    }

    loginWithFacebook() {
        this.authService.loginWithFacebook();
    }

    loginWithTwitter() {
        this.authService.loginWithTwitter();
    }

    loginWithGitHub() {
        this.authService.loginWithGitHub();
    }

    ngOnInit() {
    }

}

