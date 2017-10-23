import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { UpTemp } from '../../upload/upload';
import * as firebase from 'firebase';
import * as _ from 'lodash';

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
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
    private userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;
    userTemp: User;
    currentUpload: UpTemp;
    dropzoneActive = false;

    constructor(
        public dialogRef: MatDialogRef<AvatarComponent>,
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

    dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
    }

    handleDrop(fileList: FileList) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new UpTemp(fileList[idx]);
            this.pushUpload(this.currentUpload);
        });
    }

    pushUpload(upTemp: UpTemp) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`users/${this.userTemp.uid}/avatar`).put(upTemp.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>  {
                const snap = snapshot as firebase.storage.UploadTaskSnapshot;
                upTemp.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
            },
            (error) => {
                this.snack.open(error.message, '', { duration: 4000 });
                console.log(error);
            },
            () => {
                console.log('Avatar has been deleted for replacement');
                this.userTemp.photoURL = uploadTask.snapshot.downloadURL;
                this.userDoc.update(this.userTemp).catch(error => console.log(error)).then(() => {
                    this.snack.open('Your avatar has been updated sucessfully', 'OK', { duration: 4000 });
                    this.dialogRef.close();
                });
                return undefined;
            });
    }
}
