import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {UpTemp} from './upload/upload';

export class Upload {
    id: string;
    name: string;
    url: string;
    createdAt: any;
    updatedAt: any;
    uploaderUID: string;
    filetype: string;
    size: number;
    shared: boolean;
}

@Injectable()
export class UploadService {

    private uploadsCollection: AngularFirestoreCollection<Upload>;
    private uploadDoc: AngularFirestoreDocument<Upload>;
    uploads: Observable<Upload[]>;
    upload: Observable<Upload>;
    private basePath = 'uploads';

    constructor(private db: AngularFirestore, private auth: AuthService, private snack: MatSnackBar) {
        this.uploadsCollection = this.db.collection('uploads', ref => ref.where('shared', '==', true).orderBy('createdAt'));
        this.uploads = this.uploadsCollection.valueChanges();
    }

    deleteUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        this.uploadsCollection.doc(`${upload.id}`).delete()
            .then( () => {
                storageRef.child(`${this.basePath}/${upload.id}`).delete();
                this.snack.open(upload.name + ' has been deleted', '', { duration: 4000 });
            }).catch(error => {
            this.snack.open(error.message, '', { duration: 4000 });
            console.error(error);
        });
    }

    pushUpload(upTemp: UpTemp, shared: boolean) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upTemp.fileID}`).put(upTemp.file);

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
                const id = uploadTask.snapshot.metadata.name;
                const name = upTemp.file.name;
                const url = uploadTask.snapshot.downloadURL;
                const createdAt = uploadTask.snapshot.metadata.timeCreated;
                const updatedAt = uploadTask.snapshot.metadata.updated;
                const uploaderUID = this.auth.userState.uid;
                const filetype = upTemp.file.name.split('.').pop();
                const size = uploadTask.snapshot.metadata.size;
                const upload: Upload = { id, name, url, createdAt, updatedAt, uploaderUID, filetype, size, shared };
                this.uploadsCollection.doc(upload.id).set(upload).catch();
                this.snack.open(upTemp.file.name + ' has been uploaded successfully', '', { duration: 4000 });
                return undefined;
            }
        );
    }
}
