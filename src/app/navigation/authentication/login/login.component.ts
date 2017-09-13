import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router, private toastService: MzToastService) {}

    signInWithGoogle(): void {
        this.auth.googleLogin();
    }

    signInWithFacebook(): void {
        this.auth.facebookLogin();
    }

    signInWithTwitter(): void {
        this.auth.twitterLogin();
    }

    signInWithGithub(): void {
        this.auth.githubLogin();
    }

    logout() {
        this.auth.signOut();
    }

    ngOnInit() { }

}

