import { Component } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent extends MzBaseModal {
    usernameText: string;
    usernameAvailable: boolean;

    constructor(public auth: AuthService) {
        super();
    }

    checkUsername() {
        // this.auth.checkUsername(this.usernameText).subscribe(username => {
        //     this.usernameAvailable = !username.$value;
        // });
    }

    updateUsername() {
        this.auth.updateUsername(this.usernameText);
    }

}
