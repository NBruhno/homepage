import {Injectable} from '@angular/core';
import {Upload} from './upload/upload';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {MzToastService} from 'ng2-materialize';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';

@Injectable()
export class UploadService {

    constructor(private db: AngularFireDatabase, private toastService: MzToastService, private auth: AuthService) { }

    private basePath = '/uploads';
    uploads: FirebaseListObservable<Upload[]>;


    getUploads(query = { }) {
        this.uploads = this.db.list(this.basePath, {
            query: query
        });
        return this.uploads;
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then( () => {
                this.deleteFileStorage(upload.name);
                this.toastService.show(upload.name + ' has been deleted', 4000);
            }).catch(error => {
            this.toastService.show(error.message, 4000, 'red');
            console.error(error);
        });
    }

    pushUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        const day: string = new Date().getDate().toString();
        const month: string = new Date().getMonth().toString();
        const year: string = new Date().getFullYear().toString();

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>  {
                const snap = snapshot as firebase.storage.UploadTaskSnapshot;
                upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
            },
            (error) => {
                this.toastService.show('An error has occurred', 4000, 'red');
                console.log(error);
            },
            () => {
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                upload.createdAt = (day + '/' + month + '/' + year);
                upload.uploaderUID = this.auth.currentUserId;
                upload.uploaderName = this.auth.currentUserDisplayName;
                this.saveFileData(upload);
                this.toastService.show(upload.name + ' has been uploaded successfully', 4000);
                return undefined;
            }
        );
    }

    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
}
