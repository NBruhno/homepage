import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

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
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
    usernameText: string;
    usernameAvailable: boolean;
    private userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;
    userTemp: User;

    constructor(
        public dialogRef: MatDialogRef<UsernameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private snack: MatSnackBar) {

        this.user = this.afAuth.authState.switchMap(user => {
            if (user) {
                this.userDoc = db.doc<User>(`/users/${user.uid}`);
                return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return Observable.of(null);
            }
        });
    }

    ngOnInit() {
        this.user.subscribe(user => this.userTemp = user);
    }

    checkUsername() {
        const username = this.usernameText;
        this.usernameAvailable = true;
        this.getUsernames(username).subscribe(content => {
            if (content.toString() === '[object Object]') {
                this.usernameAvailable = false;
            }
        });
    }

    getUsernames(username) {
        const usernameRef = this.db.collection('users', ref => ref.where('username', '==', username));
        return usernameRef.valueChanges();
    }

    updateUsername() {
        this.userTemp.username = this.usernameText;
        this.userDoc.update(this.userTemp).catch(error => console.log(error)).then(() => {
            this.snack.open('Your username has been updated sucessfully', 'OK', { duration: 4000 });
            this.dialogRef.close();
        });
    }
}
