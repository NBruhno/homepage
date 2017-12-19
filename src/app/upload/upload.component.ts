import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Upload, UploadService } from '../upload.service';
import { AuthService } from '../auth.service';
import * as _ from 'lodash';
import { UpTemp } from './upload';
import 'rxjs/add/operator/first';
import { AutoUnsubscribe } from '../autounsubscribe';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css'],
    animations: [
        trigger('loadState', [
            state('moveIn1', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            transition('* => moveIn1', animate('1000ms', keyframes([
                style({ transform: 'translateY(20px)', opacity: '0'}),
                style({ transform: 'translateY(13px)', opacity: '0.6'}),
                style({ transform: 'translateY(8px)', opacity: '0.7'}),
                style({ transform: 'translateY(4px)', opacity: '0.75'}),
                style({ transform: 'translateY(2px)', opacity: '0.85'}),
                style({ transform: 'translateY(1px)', opacity: '0.93'}),
                style({ transform: 'translateY(0px)', opacity: '1'})
            ])))
        ])
    ]
})

@AutoUnsubscribe()
export class UploadComponent implements OnInit {
    loaded1 = 'moveIn1';
    uploads: Upload[];
    ready = false;
    currentUpload: UpTemp;
    dropzoneActive = false;

    constructor(private up: UploadService, public auth: AuthService) {}
    dropzoneState($event: boolean) {
        this.dropzoneActive = $event;
    }

    handleDrop(fileList: FileList) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new UpTemp(fileList[idx]);
            this.up.pushUpload(this.currentUpload);
            this.ngOnInit();
        });
    }

    fileEvent(fileList: FileList) {
        const filesIndex = _.range(fileList.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new UpTemp(fileList[idx]);
            this.up.pushUpload(this.currentUpload);
            this.ngOnInit();
        });
    }

    ngOnInit() {
        this.up.uploads.first().subscribe((uploads: Upload[]) => {
            this.uploads = uploads;
            this.ready = true;
        });
    }

}
