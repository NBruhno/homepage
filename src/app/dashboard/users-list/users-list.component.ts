import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    usersList: Observable<User[]>;
    users: User[];

    constructor(private auth: AuthService, private db: AngularFirestore) {
        this.auth.users.subscribe(users => {
            console.log(users);
            this.users = users;
        });
        this.usersList = this.db.collection('users', ref => ref.orderBy('username')).valueChanges();
    }

    ngOnInit() {
    }

}
