import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AuthenticationComponent } from "../authentication.component";
import { DialogService } from "../../dialog.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private authSpin: AuthenticationComponent, private dialog: DialogService) {}

    signInWithGoogle(): void {
        this.authSpin.toggleSpinner();
        this.auth.googleLogin().then(() => this.authSpin.toggleSpinner());
    }

    signInWithFacebook(): void {
        this.authSpin.toggleSpinner();
        this.auth.facebookLogin().then(() => this.authSpin.toggleSpinner());
    }

    signInWithTwitter(): void {
        this.authSpin.toggleSpinner();
        this.auth.twitterLogin().then(() => this.authSpin.toggleSpinner());
    }

    signInWithGithub(): void {
        this.authSpin.toggleSpinner();
        this.auth.githubLogin().then(() => this.authSpin.toggleSpinner());
    }

    ngOnInit() { }

}

