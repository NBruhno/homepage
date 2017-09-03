import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
    email: string;
    password: string;

    constructor() {}

    ngOnInit() {
    }

}
