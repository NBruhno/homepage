import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MzToastService } from 'ng2-materialize';

@Injectable()

export class AuthService {
    authState = null;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router,
                private toastService: MzToastService) {

        this.afAuth.authState
            .subscribe((auth) => {
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
                this.authState = credential.user;
                this.updateUserData();
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData();
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
                this.updateUserData();
            })
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    resetPassword(email: string) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(() => this.toastService.show('A mail with a password reset link has been sent your way', 4000, 'green'))
            .catch((error) => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
        this.toastService.show('You have been signed out successfully', 4000, 'green');
    }

    private updateUserData(): void {

        const path = `users/${this.currentUserId}`;
        const data = {
            email: this.authState.email,
            name: this.authState.displayName
        };

        this.db.object(path).update(data)
            .catch(error => this.toastService.show('An error has occurred', 4000, 'red') && console.log(error));
    }

}
