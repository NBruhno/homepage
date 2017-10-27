import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(private iconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private title: Title,
                private activatedRoute: ActivatedRoute,
                private router: Router) {

        iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    }

    ngOnInit() {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }).filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => this.title.setTitle(event['title']));
    }
}
