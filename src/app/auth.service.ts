import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(private firebaseAuth: AngularFireAuth) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password: string) {
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Success!', value);
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    loginWithMail(email: string, password: string) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Nice, it worked!');
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    loginWithGoogle() {
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    loginWithFacebook() {
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    loginWithTwitter() {
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

    loginWithGitHub() {
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

    logout() {
        this.firebaseAuth
            .auth
            .signOut();
    }

}
