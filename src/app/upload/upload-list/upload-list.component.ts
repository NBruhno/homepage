import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {Upload} from '../upload';
import {UploadService} from '../../upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
    uploads: FirebaseListObservable<Upload[]>;
    showSpinner = true;

    constructor(private up: UploadService) { }

    ngOnInit() {
        this.uploads = this.up.getUploads();
        this.uploads.subscribe(() => this.showSpinner = false);
    }
}
