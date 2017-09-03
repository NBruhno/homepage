import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';
import {FirebaseListObservable} from 'angularfire2/database';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

    constructor(public authService: AuthService) {}

    ngOnInit() {
    }
}
