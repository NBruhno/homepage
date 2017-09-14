import { Component, Input, OnInit } from '@angular/core';
import { Upload } from '../upload';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})
export class UploadDetailComponent implements OnInit {

    @Input() upload: Upload;

    constructor(private up: UploadService) { }

    ngOnInit() {
    }

    deleteUpload(upload) {
        this.up.deleteUpload(this.upload);
    }
}
