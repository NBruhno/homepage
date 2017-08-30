import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;

    constructor(public authService: AuthService) {}

    signup() {
        this.authService.signup(this.email, this.password);
        this.email = this.password = '';
    }

    login() {
        this.authService.login(this.email, this.password);
        this.email = this.password = '';
    }

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
    }

}
