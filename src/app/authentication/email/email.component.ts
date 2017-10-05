import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameComponent } from '../username/username.component';
import { MzModalService } from 'ng2-materialize';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {
    userForm: FormGroup;
    newUser = true;

    errorMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Email must be a valid email'
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Password must include at least one letter and one number.',
            'minlength': 'Password must be at least 8 characters long.',
            'maxlength': 'Password cannot be more than 25 characters long.',
        }
    };

    constructor(private fb: FormBuilder, private auth: AuthService, private modalService: MzModalService) { }

    ngOnInit(): void {
        this.buildForm();
    }

    toggleForm() {
        this.newUser = !this.newUser;
    }

    signup(): void {
        this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
    }

    login(): void {
        this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
    }

    resetPassword() {
        this.auth.resetPassword(this.userForm.value['email']);
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]],
            'password': ['', [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(8),
                Validators.maxLength(25)
            ]],
        });
    }

    // checkUsername() {
    //     if (this.auth.hasUsername === false) {
    //         this.modalService.open(UsernameComponent);
    //     }
    // }
}
