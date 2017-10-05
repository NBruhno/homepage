import { Component, OnInit } from '@angular/core';
import {Upload} from '../upload';
import {UploadService} from '../../upload.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
    uploads: Observable<Upload[]>;
    showSpinner = true;

    constructor(private up: UploadService) { }

    ngOnInit() {
        // this.uploads = this.up.getUploads();
        this.uploads.subscribe(() => this.showSpinner = false);
    }
}
