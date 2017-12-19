import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { ErrorService } from '../../error.service';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {
    loaded = true;
    finished = true;
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

    constructor(private fb: FormBuilder, public auth: AuthService, private error: ErrorService) { }

    ngOnInit(): void {
        this.buildForm();
        this.auth.user.subscribe((user) => {
            if (user) {
                if (user.uid !== '') {
                    this.finished = true;
                } else {
                    this.finished = false;
                }
            }
        });
    }

    toggleForm() {
        this.newUser = !this.newUser;
    }

    signup(): void {
        this.loaded = false;
        this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']).then(() => {
            this.loaded = true;
            this.finished = false;
        }).catch((error) => {
            this.error.log(error);
            this.loaded = true;
            this.finished = true;
        });
    }

    login(): void {
        this.loaded = false;
        this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then(() => {
            this.loaded = true;
            this.finished = false;
        }).catch((error) => {
            this.error.log(error);
            this.loaded = true;
            this.finished = true;
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
                Validators.required,
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
