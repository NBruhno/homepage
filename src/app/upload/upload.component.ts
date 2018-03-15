import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Upload, UploadService } from '../upload.service';
import { AuthService, User } from '../auth.service';
import * as _ from 'lodash';
import { UpTemp } from './upload';
import 'rxjs/add/operator/first';
import { AutoUnsubscribe } from '../autounsubscribe';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css'],
})
@AutoUnsubscribe()
export class UploadComponent implements OnInit {
    private privateUploadsCollection: AngularFirestoreCollection<Upload>;
    privateUploads: Observable<Upload[]>;
    uploads: Upload[];
    ready = false;
    currentUpload: UpTemp;
    privateCurrentUpload: UpTemp;
    dropzoneActive = false;

    constructor(public up: UploadService, public auth: AuthService, private db: AngularFirestore) {}
    dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
    }

    handleDrop(fileList: FileList, pub: boolean) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, idx => {
            if (pub) {
                this.currentUpload = new UpTemp(fileList[idx], this.db.createId());
                this.up.pushUpload(this.currentUpload, pub);
            } else {
                this.privateCurrentUpload = new UpTemp(fileList[idx], this.db.createId());
                this.up.pushUpload(this.privateCurrentUpload, pub);
            }
        });
    }

    fileEvent(fileList: FileList, pub: boolean) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, idx => {
            if (pub) {
                this.currentUpload = new UpTemp(fileList[idx], this.db.createId());
                this.up.pushUpload(this.currentUpload, pub);
            } else {
                this.privateCurrentUpload = new UpTemp(fileList[idx], this.db.createId());
                this.up.pushUpload(this.privateCurrentUpload, pub);
            }
        });
    }

    ngOnInit() {
        this.auth.user.subscribe((user: User) => {
            this.privateUploadsCollection = this.db.collection('uploads', ref =>
                ref
                    .where('uploaderUID', '==', user.uid)
                    .where('shared', '==', false)
                    .orderBy('createdAt')
            );
            this.privateUploads = this.privateUploadsCollection.valueChanges();
        });

        this.up.uploads.first().subscribe((uploads: Upload[]) => {
            this.uploads = uploads;
            this.ready = true;
        });
    }
}
