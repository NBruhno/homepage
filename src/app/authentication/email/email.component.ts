import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { LogService } from '../../log.service';

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
        email: '',
        password: ''
    };
    validationMessages = {
        email: {
            required: 'I can\'t verify you without an email, can I?',
            email: 'This does not look like a valid email to me.'
        },
        password: {
            required: 'You need to type in a password silly.',
            pattern: 'I would prefer if you used at least one letter and one number in your password.',
            minlength: 'Can you try to make the password longer than 4 characters?',
            maxlength: 'That is quite the mouthful! Can you shorten it to a maximum of 40 charaters?'
        }
    };

    constructor(private fb: FormBuilder, public auth: AuthService, private log: LogService) {}

    ngOnInit(): void {
        this.buildForm();
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

    toggleForm() {
        this.newUser = !this.newUser;
    }

    signup(): void {
        this.loaded = false;
        this.auth
            .emailSignUp(this.userForm.value['email'], this.userForm.value['password'])
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

    login(): void {
        this.loaded = false;
        this.auth
            .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
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

    resetPassword() {
        this.auth.resetPassword(this.userForm.value['email']);
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    Validators.minLength(8),
                    Validators.maxLength(25)
                ]
            ]
        });
        this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
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
