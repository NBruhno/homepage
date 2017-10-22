import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { MatSnackBar } from "@angular/material";
import { DialogService } from "./dialog.service";

interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
}

interface User {
    email: string;
    emailVerified: boolean;
    photoURL?: string;
    uid: string;
    username: string;
    name: string;
    admin?: boolean;
    author?: boolean;
    reader: boolean;
}

@Injectable()
export class AuthService {

    private usersCollection: AngularFirestoreCollection<User>;
    private userDoc: AngularFirestoreDocument<User>;
    users: Observable<User[]>;
    user: Observable<User>;
    userBehave: BehaviorSubject<User> = new BehaviorSubject(null);
    userState: any = null;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore,
                private router: Router,
                private snack: MatSnackBar,
                private dialog: DialogService) {

        this.user = this.afAuth.authState.switchMap(user => {
            this.userState = user;
            if (user) {
                return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return Observable.of(null);
            }
        });

        // this.afAuth.authState.switchMap(auth => {
        //     this.userState = auth;
        //     this.usersCollection = db.collection<User>('users');
        //     this.users = this.usersCollection.valueChanges();
        //     if (auth) {
        //         this.userDoc = db.doc<User>(`/users/${auth.uid}`);
        //         return this.user = this.userDoc.valueChanges();
        //     } else {
        //         return Observable.of(null);
        //     }
        // }).subscribe(user => {
        //     this.userBehave.next(user);
        // });
    }

    get authenticated(): boolean {
        return this.userState !== null;
    }

    get currentUser(): any {
        return this.authenticated ? this.userState : null;
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.socialSignIn(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.socialSignIn(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.socialSignIn(provider);
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.socialSignIn(provider);
    }

    private socialSignIn(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) =>  {
                this.userState = credential.user;
                this.updateUserData(credential.user);
            }).catch(error => {
                this.snack.open(error.message, '', { duration: 4000 });
                // this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.userState = user;
                this.updateUserData(user);
            }).catch(error => {
                this.dialog.openDialog(error.message, 'error');
                console.error(error);
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.userState = user;
                this.updateUserData(user);
            }).catch(error => {
                this.dialog.openDialog(error.message, 'error');
                this.snack.open(error.message, '', { duration: 4000 });
                // this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => {
                this.snack.open('A mail with a password reset link has been sent your way', '', { duration: 4000 });
                // this.toastService.show('A mail with a password reset link has been sent your way', 4000);
            })
            .catch(error => {
                this.snack.open(error.message, '', { duration: 4000 });
                // this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    signOut(): void {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
            this.snack.open('You have been signed out', '', { duration: 4000 });
        });
        // this.toastService.show('You have been signed out', 4000);
    }

    updateUserData(user) {
        // this.userDoc = this.db.doc<User>(`/users/${auth.uid}`);
        // this.user = this.userDoc.valueChanges();

        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

        const data: User = {
            email: this.userState.email,
            emailVerified: this.userState.emailVerified,
            photoURL: this.userState.photoURL,
            uid: this.userState.uid,
            username: null,
            name: null,
            admin: false,
            author: false,
            reader: true
        };

        this.user.subscribe(user => {
            if (user === null) {
                userRef.set(data);
            } else {
                if (user.username !== null) {
                    this.snack.open('Welcome back ' + user.username, '', { duration: 4000 });
                } else {
                    this.router.navigate(['/']);
                    this.dialog.openDialog('Missing username', 'username');
                }
            }
        });

        // this.user.subscribe(user => {
        //     if (user === null) {
        //         this.userDoc.set({
        //             displayName: this.userState.displayName,
        //             email: this.userState.email,
        //             emailVerified: this.userState.emailVerified,
        //             photoURL: this.userState.photoURL,
        //             uid: this.userState.uid,
        //             username: '',
        //             name: '',
        //             admin: false,
        //             author: false,
        //             reader: true
        //         });
        //         this.afterSignIn();
        //     } else {
        //         this.afterSignIn();
        //     }
        // });
    }

    afterSignIn(): void {
        this.router.navigate(['/']);
        this.user.subscribe(user => {
            if (user.username !== null) {
                this.snack.open('Welcome back ' + user.username, '', { duration: 4000 });
            } else {
                console.log('User has no username');
                this.dialog.openDialog('Missing username', 'username');
            }
        });
    }

    updateDoc(user: User) {
        this.userDoc.update(user).catch(error => console.log(error));
    }

    createDoc(user: User) {
        this.userDoc.set(user).catch(error => console.log(error));
    }

    deleteDoc(user: User) {
        this.userDoc.set(user).catch(error => console.log(error));
    }
}
