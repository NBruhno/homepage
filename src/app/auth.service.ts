import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { MzToastService } from 'ng2-materialize';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
}

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
                private toastService: MzToastService) {

        this.afAuth.authState.switchMap(auth => {
            this.userState = auth;
            this.usersCollection = db.collection<User>('users');
            this.users = this.usersCollection.valueChanges();
            if (auth) {
                this.userDoc = db.doc<User>(`/users/${auth.uid}`);
                return this.user = this.userDoc.valueChanges();
            } else {
                return Observable.of(null);
            }
        }).subscribe(user => {
            this.userBehave.next(user);
        });
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
        username = username.toLowerCase();
        console.log(username);
        this.db.collection('users', ref => ref.where('username', '==', username)).valueChanges().subscribe( username => {
            if (username !== null) {
                console.log(username);
            } else { console.log(username); }
            return username;
        });
    }

    updateUsername(username: string) {
        this.user.subscribe(user => {
            user.username = username;
            this.updateDoc(user);
        });
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
                    photoURL: this.userState.photoURL,
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
            this.toastService.show('Welcome back ' + user.username, 4000);
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
