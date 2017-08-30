import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    public modalOptions: Materialize.ModalOptions = {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '100%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: (modal, trigger) => {  },
        complete: () => {  } // Callback for Modal close
    };

    scrollToContact() {
        const el = document.getElementById('contactTarget');
        el.scrollIntoView({behavior: 'smooth'});
    }

    scrollToAbout() {
        const el = document.getElementById('aboutTarget');
        el.scrollIntoView({behavior: 'smooth'});
    }

    constructor() { }

    ngOnInit() {
    }

}
