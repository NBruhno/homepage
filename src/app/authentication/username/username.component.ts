import { Component } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { AuthService } from '../../auth.service';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

export interface Username {
    username: string;
}

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent extends MzBaseModal {
    usernameText: string;
    usernameAvailable: boolean;
    usernameList: Observable<Username[]>;

    constructor(public auth: AuthService, private db: AngularFirestore) {
        super();
    }

    checkUsername() {
        let username = this.usernameText;
        username = username.toLowerCase();
        console.log(username);
        this.usernameList = this.db.collection('users', ref => ref.where('username', '==', username)).valueChanges();
        this.usernameList.subscribe(username => { console.log(username); });
    }

    updateUsername() {
        this.auth.updateUsername(this.usernameText);
    }

}
