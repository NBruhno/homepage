import { Component, OnInit } from '@angular/core';
import { Upload, UploadService } from '../../upload.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
    showSpinner = true;
    uploadList: Observable<Upload[]>;
    uploads: Upload[];

    constructor(public up: UploadService, private db: AngularFirestore) {
    }

    ngOnInit() {
        this.up.uploads.subscribe(uploads => { this.uploads = uploads; console.log(this.uploads); this.showSpinner = false; });
        this.uploadList = this.db.collection('uploads', ref => ref.orderBy('name')).valueChanges();
    }

}
