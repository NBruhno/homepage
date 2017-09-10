import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
                style({ transform: 'translateY(7px)', opacity: '0.8'}),
                style({ transform: 'translateY(3px)', opacity: '0.90'}),
                style({ transform: 'translateY(1px)', opacity: '0.95'}),
                style({ transform: 'translateY(0px)', opacity: '1'})
            ]))),
            transition('* => inactive', animate('800ms', keyframes([
                style({ transform: 'translateY(0px)', opacity: '1'}),
                style({ transform: 'translateY(1px)', opacity: '0.95'}),
                style({ transform: 'translateY(3px)', opacity: '0.90'}),
                style({ transform: 'translateY(7px)', opacity: '0.8'}),
                style({ transform: 'translateY(13px)', opacity: '0.6'}),
                style({ transform: 'translateY(20px)', opacity: '0'})
            ])))
        ])
    ]
})

export class AboutComponent implements OnInit {
    scrollimateOptions: any = {
        section1: {
            currentState: 'inactive',
            states: [
                {
                    method: 'percentTotal',
                    value: 8,
                    state: 'active',
                },
                {
                    method: 'default',
                    state: 'inactive'
                }
            ]
        },
        section2: {
            currentState: 'inactive',
            states: [
                {
                    method: 'percentTotal',
                    value: 30,
                    state: 'active',
                },
                {
                    method: 'default',
                    state: 'inactive'
                }
            ]
        },
        section3: {
            currentState: 'inactive',
            states: [
                {
                    method: 'percentTotal',
                    value: 48,
                    state: 'active',
                },
                {
                    method: 'default',
                    state: 'inactive'
                }
            ]
        },
    };

    ngOnInit() { }

}
