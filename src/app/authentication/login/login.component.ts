import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AuthenticationComponent } from '../authentication.component';
import { DialogService } from '../../dialog.service';
import { LogService } from '../../log.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loaded = true;
    finished = true;

    constructor(public auth: AuthService, private log: LogService) {}

    signInWithGoogle(): void {
        this.loaded = false;
        this.auth
            .googleLogin()
            .then(() => {
                this.loaded = true;
                this.finished = false;
            })
            .catch(error => {
                this.log.error(error);
                this.loaded = true;
                this.finished = true;
            });
    }

    signInWithFacebook(): void {
        this.loaded = false;
        this.auth
            .facebookLogin()
            .then(() => {
                this.loaded = true;
                this.finished = false;
            })
            .catch(error => {
                this.log.error(error);
                this.loaded = true;
                this.finished = true;
            });
    }

    signInWithTwitter(): void {
        this.loaded = false;
        this.auth
            .twitterLogin()
            .then(() => {
                this.loaded = true;
                this.finished = false;
            })
            .catch(error => {
                this.log.error(error);
                this.loaded = true;
                this.finished = true;
            });
    }

    signInWithGithub(): void {
        this.loaded = false;
        this.auth
            .githubLogin()
            .then(() => {
                this.loaded = true;
                this.finished = false;
            })
            .catch(error => {
                this.log.error(error);
                this.loaded = true;
                this.finished = true;
            });
    }

    ngOnInit() {
        this.auth.user.subscribe(user => {
            if (user) {
                if (user.uid !== '') {
                    this.finished = true;
                } else {
                    this.finished = false;
                }
            }
        });
    }
}
