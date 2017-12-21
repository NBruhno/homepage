import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from './error.service';

export interface User {
    email: string;
    emailVerified: boolean;
    uid: string;
    name?: string;
    photoURL?: string;
    country?: string;
    groups?: string[];
    provider?: string;
    completeProfile?: boolean;
}

@Injectable()
export class AuthService {

    private userDoc: AngularFirestoreDocument<User>;
    private usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    user: Observable<User>;
    userState: any = null;
    userVerified = false;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore,
                private error: ErrorService,
                private router: Router,
                private snack: MatSnackBar) {

        this.user = this.afAuth.authState.switchMap(user => {
            this.usersCollection = this.db.collection('users');
            this.users = this.usersCollection.valueChanges();
            this.userState = user;
            if (user) {
                return this.db.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return Observable.of(null);
            }
        });
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
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.userState = user;
                this.updateUserData(user);
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.userState = user;
                this.updateUserData(user);
            });
    }

    sendVerifyEmail() {
        let user: any = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then((success) => this.snack.open(
                'A mail with a verification link has been sent your way', '', { duration: 4000 }))
            .catch((error) => this.error.log(error));
    }

    verifyEmail(user: User) {
        if (this.userState.emailVerified) {
            return this.db.doc(`users/${user.uid}`).update({emailVerified: true})
                .catch(error => this.error.log(error))
                .then(() => {
                    this.router.navigate(['/']);
                    this.snack.open('Your email has been verified successfully', 'Thank you', { duration: 4000 });
                });
        } else {
            this.snack.open('Your email has not been verified yet through your email', '', { duration: 4000 });
        }
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => {
                this.snack.open('A mail with a password reset link has been sent your way', '', { duration: 4000 });
            }).catch(error => this.error.log(error));
    }

    signOut(): void {
        this.afAuth.auth.signOut().then(() => {
            this.userVerified = false;
            this.router.navigate(['/']);
            this.snack.open('You have been signed out', 'OK', { duration: 4000 });
        });
    }

    updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
        const data: User = {
            email: this.userState.email,
            emailVerified: this.userState.emailVerified,
            photoURL: this.userState.photoURL,
            uid: this.userState.uid,
            completeProfile: false
        };

        this.user.subscribe(userData => {
            if (userData === null) {
                userRef.set(data);
            } else {
                if (userData.completeProfile) {
                    if (this.userState.emailVerified) {
                        this.userVerified = true;
                        this.router.navigate(['/']);
                        this.snack.open('Welcome back ' + userData.name, 'Thank you', { duration: 4000 });
                    }
                }
            }
        });
    }

    updateCompleteProfile(user: User, data: any) {
        return this.db.doc(`users/${user.uid}`).update(data)
            .catch(error => this.error.log(error))
            .then(() => {
                this.sendVerifyEmail();
                this.snack.open(
                    'Welcome ' + data.name + 'an email with a verification link has been sent your way',
                    '', { duration: 4000 });
            });
    }

    updateName(user: User, data: any) {
        return this.db.doc(`users/${user.uid}`).update(data)
            .catch(error => this.error.log(error))
            .then(() => {
                this.snack.open('Your name has been changed to  ' + data.name, 'Thank you', { duration: 4000 });
            });
    }
}
