import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    animations: [
        trigger('elementState', [
            state('inactive', style({
                opacity: 0,
                transform: 'translateY(20px)'
            })),
            state('active', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            transition('* => active', animate('800ms', keyframes([
                style({ transform: 'translateY(20px)', opacity: '0'}),
                style({ transform: 'translateY(13px)', opacity: '0.6'}),
                style({ transform: 'translateY(8px)', opacity: '0.7'}),
                style({ transform: 'translateY(4px)', opacity: '0.75'}),
                style({ transform: 'translateY(2px)', opacity: '0.85'}),
                style({ transform: 'translateY(1px)', opacity: '0.93'}),
                style({ transform: 'translateY(0px)', opacity: '1'})
            ]))),
            transition('* => inactive', animate('800ms', keyframes([
                style({ transform: 'translateY(0px)', opacity: '1'}),
                style({ transform: 'translateY(1px)', opacity: '0.93'}),
                style({ transform: 'translateY(2px)', opacity: '0.85'}),
                style({ transform: 'translateY(4px)', opacity: '0.75'}),
                style({ transform: 'translateY(8px)', opacity: '0.7'}),
                style({ transform: 'translateY(13px)', opacity: '0.6'}),
                style({ transform: 'translateY(20px)', opacity: '0'}),
            ])))
        ]),
    ]
})

export class AboutComponent implements OnInit {
    scrollimateOptions: any = {
        section1: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section2: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section3: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section4: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section5: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section6: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section7: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section8: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section9: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section10: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 22, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section11: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 15, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section12: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 15, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
        section13: {
            currentState: 'inactive',
            states: [{method: 'percentElement', value: 15, state: 'active'}, {method: 'default', state: 'inactive'}]
        },
    };

    time = new Date().valueOf();
    photoshopYears = this.convertMillisecondsToYears(this.time - new Date('2009-09-01T12:00:00.0').valueOf());
    indesignYears = this.convertMillisecondsToYears(this.time - new Date('2014-09-01T12:00:00.0').valueOf());
    illustratorYears = this.convertMillisecondsToYears(this.time - new Date('2013-09-01T12:00:00.0').valueOf());
    intellijYears = this.convertMillisecondsToYears(this.time - new Date('2016-09-01T12:00:00.0').valueOf());
    githubYears = this.convertMillisecondsToYears(this.time - new Date('2014-09-01T12:00:00.0').valueOf());
    cYears = this.convertMillisecondsToYears(this.time - new Date('2014-09-01T12:00:00.0').valueOf());
    jsYears = this.convertMillisecondsToYears(this.time - new Date('2012-09-01T12:00:00.0').valueOf());
    tsYears = this.convertMillisecondsToYears(this.time - new Date('2016-09-01T12:00:00.0').valueOf());
    htmlYears = this.convertMillisecondsToYears(this.time - new Date('2010-09-01T12:00:00.0').valueOf());
    angularYears = this.convertMillisecondsToYears(this.time - new Date('2016-09-01T12:00:00.0').valueOf());


    convertMillisecondsToYears(ms) {
        const years = Math.floor(ms / 31536000000);
        return years;
    }

    ngOnInit() {
    }

}
