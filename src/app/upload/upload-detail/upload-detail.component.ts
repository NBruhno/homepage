import { Component, Input, OnInit } from '@angular/core';
import { Upload, UploadService } from '../../upload.service';
import { AuthService, User } from '../../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})

export class UploadDetailComponent implements OnInit {

    @Input() upload: Upload;
    private uploaderDoc: AngularFirestoreDocument<User>;
    uploader: Observable<User>;

    constructor(public up: UploadService, public db: AngularFirestore, public auth: AuthService) {
    }

    ngOnInit() {
        this.uploaderDoc = this.db.doc(`users/${this.upload.uploaderUID}`);
        this.uploader = this.uploaderDoc.valueChanges();
    }

    deleteUpload(upload) {
        this.up.deleteUpload(upload);
    }
}
