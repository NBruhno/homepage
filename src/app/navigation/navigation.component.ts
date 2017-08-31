import {Component, OnInit, Inject, Input} from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
    @Input() modalOptions;

    scrollToContact() {
        const el = document.getElementById('contactTarget');
        el.scrollIntoView({behavior: 'smooth'});
    }

    scrollToAbout() {
        const el = document.getElementById('aboutTarget');
        el.scrollIntoView({behavior: 'smooth'});
    }

    constructor() {}

    ngOnInit() {
    }

}
