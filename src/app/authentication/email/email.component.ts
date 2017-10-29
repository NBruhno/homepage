import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {
    userForm: FormGroup;
    newUser = true;

    formErrors = {
        'email': '',
        'password': ''
    };
    validationMessages = {
        'email': {
            'required':      'Email is required.',
            'email':         'Email must be valid'
        },
        'password': {
            'required':      'Password is required.',
            'pattern':       'Password must be include at one letter and one number.',
            'minlength':     'Password must be at least 4 characters long.',
            'maxlength':     'Password cannot be more than 40 characters long.',
        }
    };

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private authSpin: AuthenticationComponent) { }

    ngOnInit(): void {
        this.buildForm();
    }

    toggleForm() {
        this.newUser = !this.newUser;
    }

    signup(): void {
        this.authSpin.toggleSpinner();
        this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']).then(() => {
            this.authSpin.toggleSpinner();
        });
    }

    login(): void {
        this.authSpin.toggleSpinner();
        this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then(() => {
            this.authSpin.toggleSpinner();
        });
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
        this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
        const form = this.userForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}
