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
        this.auth.googleLogin().then(() => this.checkUsername());
    }

    signInWithFacebook(): void {
        this.authSpin.toggleSpinner();
        this.auth.facebookLogin().then(() => this.checkUsername());
    }

    signInWithTwitter(): void {
        this.authSpin.toggleSpinner();
        this.auth.twitterLogin().then(() => this.checkUsername());
    }

    signInWithGithub(): void {
        this.authSpin.toggleSpinner();
        this.auth.githubLogin().then(() => this.checkUsername());
    }

    checkUsername() {
        this.authSpin.toggleSpinner();
        this.auth.user.subscribe(user => {
            if (!!user.username === false) {
                console.log('User has no username');
                this.dialog.openDialog('Missing username', 'username');
            }
        });
    }

    ngOnInit() { }

}

