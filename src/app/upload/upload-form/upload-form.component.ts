import { Component } from '@angular/core';
import { UpTemp } from '../upload';
import { UploadService} from '../../upload.service';
import { AuthService } from "../../auth.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})

export class UploadFormComponent {

    currentUpload: UpTemp;
    dropzoneActive = false;

    constructor(private up: UploadService, public auth: AuthService) { }
    dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
    }

    handleDrop(fileList: FileList) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new UpTemp(fileList[idx]);
            this.up.pushUpload(this.currentUpload);
        });
    }

    fileEvent(fileList: FileList) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new UpTemp(fileList[idx]);
            this.up.pushUpload(this.currentUpload);
        });
    }
}
