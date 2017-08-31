import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
    email: string;
    password: string;

    constructor(public authService: AuthService) {}

    signup() {
        this.authService.signup(this.email, this.password);
        this.email = this.password = '';
    }

    login() {
        this.authService.loginWithMail(this.email, this.password);
        this.email = this.password = '';
    }

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
    }

}
