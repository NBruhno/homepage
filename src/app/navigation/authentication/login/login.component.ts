import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router) {}

    private afterSignIn(): void {
        console.log('Signed in');
    }

    signInWithGoogle(): void {
        this.auth.googleLogin()
            .then(() => this.afterSignIn());
    }

    signInWithFacebook(): void {
        this.auth.facebookLogin()
            .then(() => this.afterSignIn());
    }

    signInWithTwitter(): void {
        this.auth.twitterLogin()
            .then(() => this.afterSignIn());
    }

    signInWithGithub(): void {
        this.auth.githubLogin()
            .then(() => this.afterSignIn());
    }

    logout() {
        this.auth.signOut();
    }

    ngOnInit() { }

}

