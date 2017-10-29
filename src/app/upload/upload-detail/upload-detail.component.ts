import { Component, Input, OnInit } from '@angular/core';
import { Upload, UploadService } from '../../upload.service';
import { AuthService } from '../../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})

export class UploadDetailComponent implements OnInit {

    @Input() upload: Upload;


    constructor(public up: UploadService, public db: AngularFirestore, public auth: AuthService) { }

    ngOnInit() {

    }


    deleteUpload(upload) {
        this.up.deleteUpload(upload);
    }
}
