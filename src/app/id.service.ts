import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class IDService {
    currentProject: string;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.router.url.split('/')[1] === 'projects') {
                    console.log('A project ID exists on this page');
                    this.currentProject = this.router.url.split('/')[2];
                } else {
                    console.log('IDs does not exist on this route');
                    this.currentProject = undefined;
                }
            }
        });
    }
}
