import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    detailForm: FormGroup;

    formErrors = {
        'name': '',
        'country': '',
    };

    validationMessages = {
        'name': {
            'required': 'Your full name is required.',
            'pattern': 'Your name can only exist of letters.',
        },
        'country': {
            'required': 'Last country is required.',
            'pattern': 'Your country can only exist of letters.',
        },
    };

    constructor(private fb: FormBuilder, public auth: AuthService) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.detailForm = this.fb.group({
            'name': ['', [
                Validators.required,
                Validators.pattern('^[a-zA-Z æøåÆØÅ]*$'),
            ]],
            'country': ['', [
                Validators.required,
                Validators.pattern('^[a-zA-Z æøåÆØÅ]*$'),
            ]],
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

    setCompleteProfile(user) {
        return this.auth.updateCompleteProfile(user, {
            name: this.detailForm.get('name').value,
            country: this.detailForm.get('country').value,
            completeProfile: true
        });
    }
}
