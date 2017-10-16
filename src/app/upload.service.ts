import {Injectable} from '@angular/core';
import {MzToastService} from 'ng2-materialize';
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
}

@Injectable()
export class UploadService {

    private uploadsCollection: AngularFirestoreCollection<Upload>;
    private uploadDoc: AngularFirestoreDocument<Upload>;
    uploads: Observable<Upload[]>;
    upload: Observable<Upload>;
    private basePath = 'uploads';

    constructor(private db: AngularFirestore, private auth: AuthService, private toastService: MzToastService) {
        this.uploadsCollection = this.db.collection('uploads');
        this.uploads = this.uploadsCollection.valueChanges();
    }

    deleteUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        this.uploadsCollection.doc(`${upload.id}`).delete()
            .then( () => {
                storageRef.child(`${this.basePath}/${upload.name}`).delete();
                this.toastService.show(upload.name + ' has been deleted', 4000);
            }).catch(error => {
            this.toastService.show(error.message, 4000, 'red');
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
                this.toastService.show('An error has occurred', 4000, 'red');
                console.log(error);
            },
            () => {
                const id = this.db.createId();
                const name = upTemp.file.name;
                const url = uploadTask.snapshot.downloadURL;
                const createdAt = (day + '/' + month + '/' + year);
                const uploaderUID = this.auth.userState.uid;
                const upload: Upload = { id, name, url, createdAt, uploaderUID };
                this.uploadsCollection.doc(upload.id).set(upload);
                this.toastService.show(upload.name + ' has been uploaded successfully', 4000);
                return undefined;
            }
        );
    }
}
