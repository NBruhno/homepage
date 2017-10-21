import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(http: Http, iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        iconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    }
}
