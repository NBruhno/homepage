import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { MzToastService } from 'ng2-materialize';

interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
}

interface User {
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    refreshToken: string;
    uid: string;
    username: string;
    name: string;
    admin: false;
    author: false;
    reader: true;
}

@Injectable()
export class AuthService {

    private userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;
    userState: any = null;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore,
                private router: Router,
                private toastService: MzToastService) {

        this.afAuth.authState.subscribe((auth) => {
            this.userState = auth;
            if (auth !== null) {
                this.userDoc = db.doc<User>(`/users/${auth.uid}`);
                this.user = this.userDoc.valueChanges();
            } else { return null; }
        });
    }

    get authenticated(): boolean {
        return this.userState !== null;
    }

    get currentUser(): any {
        return this.authenticated ? this.userState : null;
    }

    get currentUserObservable(): any {
        return this.user;
    }

    get currentUserId(): string {
        let uid = '';
        this.user.subscribe(user => {
            uid = user.uid;
        });
        return uid;
    }

    get currentUserEmail(): string {
        let email = '';
        this.user.subscribe(user => {
            email = user.email;
        });
        return email;
    }

    get currentUserDisplayName(): string {
        let displayName = '';
        this.user.subscribe(user => {
            displayName = user.displayName;
        });
        return displayName;
    }

    get currentUsername(): string {
        let username = '';
        this.user.subscribe(user => {
            username = user.username;
        });
        return username;
    }

    // get hasUsername(): boolean {
    //     console.log('Current username: ' + this.userData.subscribe(user => user.username));
    //     console.log(!!this.userData.subscribe(user => user.username));
    //     return !!this.userData.subscribe(user => user.username);
    // }

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
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.updateUserData(user);
                this.userState = user;
            }).catch(error => {
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.userState = user;
                this.updateUserData(user);
            }).catch(error => {
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => {
                this.toastService.show('A mail with a password reset link has been sent your way', 4000);
            })
            .catch(error => {
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        this.toastService.show('You have been signed out', 4000);
    }

    checkUsername(username: string) {
        // username = username.toLowerCase();
        // return this.db.object(`usernames/${username}`);
    }

    updateUsername(username: string) {
        // const data = {};
        // data[username] = this.userState.uid;
        // this.db.object(`/users/${this.currentUserId}`).update({'username': username});
        // this.db.object(`/usernames`).update(data);
    }

    updateUserData(auth) {
        this.userDoc = this.db.doc<User>(`/users/${auth.uid}`);
        this.user = this.userDoc.valueChanges();
        this.user.subscribe(user => {
            if (user === null) {
                console.log('User does not exist, creating a document for ' + this.userState.uid);
                this.userDoc.set({
                    displayName: this.userState.displayName,
                    email: this.userState.email,
                    emailVerified: this.userState.emailVerified,
                    isAnonymous: this.userState.isAnonymous,
                    phoneNumber: this.userState.phoneNumber,
                    photoURL: this.userState.photoURL,
                    providerId: this.userState.providerId,
                    refreshToken: this.userState.refreshToken,
                    uid: this.userState.uid,
                    username: '',
                    name: '',
                    admin: false,
                    author: false,
                    reader: true
                });
                this.afterSignIn();
            } else {
                console.log('User exist under document ' + user.uid);
                this.afterSignIn();
            }
        });
    }

    afterSignIn(): void {
        this.router.navigate(['/']);
        this.user.subscribe(user => {
            console.log('Signed in as ' + user.uid);
            this.toastService.show('Welcome back' + user.username, 4000);
        });
    }
}
