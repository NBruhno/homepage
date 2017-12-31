import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    userCollection: AngularFirestoreCollection<User>;
    usersList: Observable<User[]>;
    users: User[];

    constructor(public auth: AuthService, private db: AngularFirestore) {
        this.auth.users.subscribe(users => {
            console.log(users);
            this.users = users;
        });

        this.userCollection = this.db.collection('users', ref => ref.orderBy('username'));

        this.usersList = this.userCollection.valueChanges();
    }

    ngOnInit() {}
}
