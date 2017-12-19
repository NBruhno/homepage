import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css']
})

export class FrontComponent implements OnInit {

    constructor(private seo: SeoService, private db: AngularFirestore) { }

    ngOnInit() {
        this.seo.generateTags({
            title: 'Bruhno',
            description: 'This is Nicolai Bruhn Lauritsen or more commonly known as Bruhno\'s personal website which ' +
            'functions as a portfolio and a playground.',
            image: 'https://bruhno.com/assets/images/B Light.svg'
        });
    }

}
