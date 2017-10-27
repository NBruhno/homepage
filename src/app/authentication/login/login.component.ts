import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AuthenticationComponent } from '../authentication.component';
import { DialogService } from '../../dialog.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private authSpin: AuthenticationComponent) {}

    signInWithGoogle(): void {
        this.authSpin.toggleSpinner();
        this.auth.googleLogin().then(() => { if (this.auth.userVerified) { this.authSpin.toggleSpinner(); }});
    }

    signInWithFacebook(): void {
        this.authSpin.toggleSpinner();
        this.auth.facebookLogin().then(() => { if (this.auth.userVerified) { this.authSpin.toggleSpinner(); }});
    }

    signInWithTwitter(): void {
        this.authSpin.toggleSpinner();
        this.auth.twitterLogin().then(() => { if (this.auth.userVerified) { this.authSpin.toggleSpinner(); }});
    }

    signInWithGithub(): void {
        this.authSpin.toggleSpinner();
        this.auth.githubLogin().then(() => { if (this.auth.userVerified) { this.authSpin.toggleSpinner(); }});
    }

    ngOnInit() { }

}

