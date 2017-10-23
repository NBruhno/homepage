import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DialogService } from "../dialog.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(public auth: AuthService, private dialog: DialogService) {}

    ngOnInit() {
    }

    changeUsername() {
        this.dialog.openDialog('Changing username', 'username');
    }

    changeAvatar() {
        this.dialog.openDialog('Changing avatar', 'avatar');
    }

}
