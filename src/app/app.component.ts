import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { MzModalService } from 'ng2-materialize';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    items: FirebaseListObservable<any[]>;

    constructor(db: AngularFireDatabase, private router: Router, private modalService: MzModalService) {
        this.items = db.list('/items');
    }
}
