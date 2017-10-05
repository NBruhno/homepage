import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UsernameComponent } from '../username/username.component';
import { MzModalService } from 'ng2-materialize';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, private modalService: MzModalService) {}

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

    // checkUsername() {
    //     if (this.auth.currentUser) {
    //         if (!this.auth.hasUsername) {
    //             this.modalService.open(UsernameComponent);
    //         }
    //     }
    // }

    ngOnInit() { }

}

