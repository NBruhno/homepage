import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LogService } from './log.service';

@Injectable()
export class IDService {
    currentProject: string;

    constructor(private router: Router, private log: LogService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.router.url.split('/')[1] === 'projects') {
                    if (this.router.url.split('/')[2] !== undefined) {
                        this.log.console('A project ID exists on this page as ' + this.router.url.split('/')[2]);
                        this.currentProject = this.router.url.split('/')[2];
                    } else {
                        this.log.console('A project ID is not present, was it specified after /projects/* ?');
                        this.currentProject = undefined;
                    }
                } else {
                    this.currentProject = undefined;
                }
            }
        });
    }
}
