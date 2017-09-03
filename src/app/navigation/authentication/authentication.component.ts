import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MzModalService, MzBaseModal } from 'ng2-materialize';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})



export class AuthenticationComponent extends MzBaseModal implements OnInit {

    public modalOptions: Materialize.ModalOptions = {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
            console.log(modal, trigger);
        },
        complete: () => { this.router.navigate(['']); } // Callback for Modal close
    };

    constructor(private router: Router, private modalService: MzModalService, private auth: AuthService) {
        super();
    }

    ngOnInit() {
    }
}
