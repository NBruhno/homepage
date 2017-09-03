import {AfterViewInit, Component, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationComponent} from '../navigation/authentication/authentication.component';
import {MzModalService} from 'ng2-materialize';

const scheduleMicrotask = Promise.resolve(null);

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css']
})

export class FrontComponent implements AfterViewInit {

    constructor(
        private router: Router, private modalService: MzModalService) { }

    ngAfterViewInit() {
        const currentPath = this.router.url;

        // if (currentPath === '/') {
        //     const el = document.getElementById('headerTarget');
        //     el.scrollIntoView({ behavior: 'smooth' });
        //     const navHeight = 65;
        //     const scrolledY = window.scrollY;
        //     if (scrolledY) {
        //         window.scroll(0, scrolledY - navHeight);
        //     }
        // }

        if (currentPath === '/about') {
            const el = document.getElementById('aboutTarget');
            el.scrollIntoView({ behavior: 'smooth' });
            const navHeight = 50;
            const scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - navHeight);
            }
        }

        if (currentPath === '/contact') {
            const el = document.getElementById('contactTarget');
            el.scrollIntoView({ behavior: 'smooth' });
        }

        if (currentPath === '/login') {
            scheduleMicrotask.then(() => {
                this.modalService.open(AuthenticationComponent);
            });
        }
    }
}
