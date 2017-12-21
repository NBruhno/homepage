import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    uid: string;
    username: string;
    name: string;
    admin?: boolean;
    author?: boolean;
    reader: boolean;
}

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {
    user: Observable<User>;

    constructor(
        public dialogRef: MatDialogRef<NameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public auth: AuthService,
        private fb: FormBuilder) {
    }

    detailForm: FormGroup;

    formErrors = {
        'name': '',
    };

    validationMessages = {
        'name': {
            'required': 'Your full name is required.',
            'pattern': 'Your name can only exist of letters.',
        }
    };

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.detailForm = this.fb.group({
            'name': ['', [
                Validators.required,
                Validators.pattern('^[a-zA-Z æøåÆØÅ]*$'),
            ]]
        });
        this.detailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.detailForm) { return; }
        const form = this.detailForm;

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

    updateName(user) {
        return this.auth.updateName(user, {
            name: this.detailForm.get('name').value
        }).then(() => this.dialogRef.close());
    }
}
