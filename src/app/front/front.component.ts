import { Component } from '@angular/core';
import { MzModalService } from 'ng2-materialize';
import { AuthService } from '../auth.service';
import { UsernameComponent } from './username/username.component';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css']
})

export class FrontComponent {

    constructor(private modalService: MzModalService, private auth: AuthService) {
        if (this.auth.currentUser) {
            if (this.auth.hasUsername) {
                this.openServiceModal();
            }
        }
    }

    public openServiceModal() {
        this.modalService.open(UsernameComponent);
    }

}
