import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { MzToastService } from 'ng2-materialize';

@Injectable()

export class AuthService {
    user: BehaviorSubject<User> = new BehaviorSubject(null);
    authState = null;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router,
                private toastService: MzToastService) {

        this.afAuth.authState
            .switchMap(auth => {
                if (auth) {
                    /// signed in
                    return this.db.object('users/' + auth.uid);
                } else {
                    /// not signed in
                    return Observable.of(null);
                }
            })
            .subscribe(user => {
                this.user.next(user);
            });

        this.afAuth.authState.subscribe((auth) => {
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

    get currentUserDisplayName(): string {
        if (!this.authState) {
            return 'Guest';
        } else {
            return this.authState['displayName'] || 'User without a Name';
        }
    }

    afterSignIn(): void {
        console.log('Signed in');
        this.router.navigate(['/']);
        this.toastService.show('Welcome back ' + this.currentUserDisplayName, 4000);
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
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData(user);
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData(user);
                this.router.navigate(['/']);
                this.toastService.show('You are now logged in', 4000);
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => this.toastService.show('A mail with a password reset link has been sent your way', 4000))
            .catch((error) => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        this.toastService.show('You have been signed out', 4000);
    }

    private updateUserData(authData): void {
        const userData = new User(authData);
        const ref = this.db.object('users/' + authData.uid);
        const path = `users/${this.currentUserId}`; // Endpoint on firebase
        const data = {
            email: this.authState.email,
            name: this.authState.displayName
        };

        ref.take(1)
            .subscribe(user => {
                if (!user.role) {
                    ref.update(userData);
                }
            });

        this.db.object(path).update(data)
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));

    }

    private updateUser(authData) {
        const userData = new User(authData);
        const ref = this.db.object('users/' + authData.uid);
        ref.take(1).subscribe(user => {
            if (!user.role) {
                ref.update(userData);
            }
        });
    }
}
