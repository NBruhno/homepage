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
        this.auth.googleLogin().then(() => this.checkUsername());
    }

    signInWithFacebook(): void {
        this.auth.facebookLogin().then(() => this.checkUsername());
    }

    signInWithTwitter(): void {
        this.auth.twitterLogin().then(() => this.checkUsername());
    }

    signInWithGithub(): void {
        this.auth.githubLogin().then(() => this.checkUsername());
    }

    logout() {
        this.auth.signOut();
    }

    checkUsername() {
        this.auth.user.subscribe(user => {
            if (!!user.username === false) {
                console.log('User has no username');
                this.modalService.open(UsernameComponent);
            }
        });
    }

    ngOnInit() { }

}

