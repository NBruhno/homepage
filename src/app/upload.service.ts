import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material'
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {UpTemp} from "./upload/upload";

export class Upload {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    uploaderUID: string;
    filetype: string;
}

@Injectable()
export class UploadService {

    private uploadsCollection: AngularFirestoreCollection<Upload>;
    private uploadDoc: AngularFirestoreDocument<Upload>;
    uploads: Observable<Upload[]>;
    upload: Observable<Upload>;
    private basePath = 'uploads';

    constructor(private db: AngularFirestore, private auth: AuthService, private snack: MatSnackBar) {
        this.uploadsCollection = this.db.collection('uploads');
        this.uploads = this.uploadsCollection.valueChanges();
    }

    deleteUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        this.uploadsCollection.doc(`${upload.id}`).delete()
            .then( () => {
                storageRef.child(`${this.basePath}/${upload.name}`).delete();
                this.snack.open(upload.name + ' has been deleted', '', { duration: 4000 });
            }).catch(error => {
            this.snack.open(error.message, '', { duration: 4000 });
            console.error(error);
        });
    }

    pushUpload(upTemp: UpTemp) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upTemp.file.name}`).put(upTemp.file);
        const day: string = new Date().getDate().toString();
        const month: string = new Date().getMonth().toString();
        const year: string = new Date().getFullYear().toString();

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
                const id = this.db.createId();
                const name = upTemp.file.name;
                const url = uploadTask.snapshot.downloadURL;
                const createdAt = (day + '/' + month + '/' + year);
                const uploaderUID = this.auth.userState.uid;
                const filetype = upTemp.file.name.split(".").pop();
                const upload: Upload = { id, name, url, createdAt, uploaderUID, filetype };
                this.uploadsCollection.doc(upload.id).set(upload);
                this.snack.open(upload.name + ' has been uploaded successfully', '', { duration: 4000 });
                return undefined;
            }
        );
    }
}
