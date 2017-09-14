import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

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
            ]))),
            state('moveIn2', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            transition('* => moveIn2', animate('1500ms', keyframes([
                style({ transform: 'translateY(20px)', opacity: '0'}),
                style({ transform: 'translateY(20px)', opacity: '0'}),
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

export class UploadComponent implements OnInit {
    loaded1 = 'moveIn1';
    loaded2 = 'moveIn2';

    ngOnInit() {
    }

}
