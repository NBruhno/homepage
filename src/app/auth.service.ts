import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { MzToastService } from 'ng2-materialize';

export interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
}

export class User {
    uid: string;
    username: string;
    email: string;
    name: string;
    photoURL: string;
    roles: Roles;

    constructor(auth) {
        this.uid = auth.uid;
        this.email = auth.email;
        this.photoURL = auth.photoURL;
        this.roles = { reader: true };
    }
}

@Injectable()
export class AuthService {
    user: BehaviorSubject<User> = new BehaviorSubject(null);
    userData: FirebaseObjectObservable<User>;
    authState = null;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router,
                private toastService: MzToastService) {

        this.afAuth.authState.switchMap(auth => {
            if (auth) {
                return this.db.object(`/users/${auth.uid}`);
            } else { return Observable.of(null); }
        }).subscribe(user => {
            this.user.next(user);
        });

        this.afAuth.authState.subscribe(auth => {
            this.authState = auth;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    get currentUserObservable(): any {
        return this.afAuth.authState;
    }

    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get currentUserEmail(): string {
        return this.authenticated ? this.authState.email : '';
    }

    get currentUserDisplayName(): string {
        return this.authState['displayName'] || 'You have no name!';
    }

    get currentUsername(): string {
        let username = '';
        this.getUserData().subscribe(user => username = user.username);
        return username;
    }

    getUserData(): BehaviorSubject<User> {
        if (!this.currentUserId) { return; }
        this.userData = this.db.object(`/users/${this.currentUserId}`);
        return this.user;
    }

    get hasUsername(): boolean {
        return !!this.authState.username;
    }

    afterSignIn(): void {
        let username = '';
        this.router.navigate(['/']);
        this.getUserData().subscribe(user => { username = user.username; });
        console.log('Signed in as ' + username);
        this.toastService.show('Welcome back ' + username, 4000);
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.socialSignIn(provider).then(() => this.afterSignIn());
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.socialSignIn(provider).then(() => this.afterSignIn());
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.socialSignIn(provider).then(() => this.afterSignIn());
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.socialSignIn(provider).then(() => this.afterSignIn());
    }

    private socialSignIn(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) =>  {
                this.authState = credential.user;
                this.updateUserData(credential.user);
            }).catch(error => {
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData(user);
            }).catch(error => {
                this.toastService.show(error.message, 4000, 'red');
                console.error(error);
            });
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData(user);
                this.router.navigate(['/']);
                this.toastService.show('You are now logged in', 4000);
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
        username = username.toLowerCase();
        return this.db.object(`usernames/${username}`);
    }

    updateUsername(username: string) {
        const data = {};
        data[username] = this.currentUserId;
        this.db.object(`/users/${this.currentUserId}`).update({'username': username});
        this.db.object(`/usernames`).update(data);
    }

    private updateUserData(auth): void {
        const userData = new User(auth);
        const ref = this.db.object('users/' + auth.uid);
        ref.take(1)
            .subscribe(user => {
                if (!user.roles) {
                    ref.update(userData);
                }
                if (!user.username) {
                    ref.update(userData);
                }
            });
    }
}
