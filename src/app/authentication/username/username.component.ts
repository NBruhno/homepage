import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

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
export class UsernameComponent {
    usernameText: string;
    usernameAvailable: boolean;
    private userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;

    constructor(
        public dialogRef: MatDialogRef<UsernameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private afAuth: AngularFireAuth,
        private db: AngularFirestore) {

        this.user = this.afAuth.authState.switchMap(user => {
            if (user) {
                this.userDoc = db.doc<User>(`/users/${user.uid}`);
                return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return Observable.of(null);
            }
        });
    }

    checkUsername() {
        let username = this.usernameText;
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
        this.user.subscribe(user => {
            user.username = this.usernameText;
            this.updateDoc(user);
        });
        this.dialogRef.close();
    }

    updateDoc(user: User) {
        this.userDoc.update(user).catch(error => console.log(error));
    }
}
