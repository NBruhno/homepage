import { Component, OnInit, ViewChild } from '@angular/core';
import { IDService } from '../../id.service';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from 'ngx-image-gallery';

@Component({
    selector: 'app-project-template',
    templateUrl: './project-template.component.html',
    styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {
    @ViewChild('galleryQFD') galleryQFD: NgxImageGalleryComponent;
    @ViewChild('galleryBWF') galleryBWF: NgxImageGalleryComponent;
    @ViewChild('galleryDerail') galleryDerail: NgxImageGalleryComponent;
    @ViewChild('galleryDrum') galleryDrum: NgxImageGalleryComponent;
    @ViewChild('galleryIP') galleryIP: NgxImageGalleryComponent;
    currentProjects = ['qfd-2017', 'bwf-2017', 'derailed-2016', 'drummute-2016', 'image-processing-2015'];
    idExists = false;

    conf: GALLERY_CONF = {
        imageOffset: '0px',
        showDeleteControl: false,
        showImageTitle: false,
        showThumbnails: false,
        showExtUrlControl: false,
        showCloseControl: false,
        backdropColor: 'rgba(13,13,14,0.65)',
        imagePointer: false,
        showArrows: false,
        reactToRightClick: true,
        reactToKeyboard: false,
        reactToMouseWheel: false
    };

    imagesQFD: GALLERY_IMAGE[] = [
        { url: '../../../assets/images/logo_resized.png', },
        { url: '../../../assets/images/qfd-screencap1.png', },
        { url: '../../../assets/images/qfd-screencap2.png', },
        { url: '../../../assets/images/qfd-screencap3.png', },
        { url: '../../../assets/images/qfd-screencap4.png', },
        { url: '../../../assets/images/qfd-screencap5.png', },
    ];

    imagesBWF: GALLERY_IMAGE[] = [
        { url: '../../../assets/images/logo_resized.png', },
        { url: '../../../assets/images/qfd-screencap1.png', },
        { url: '../../../assets/images/qfd-screencap2.png', },
        { url: '../../../assets/images/qfd-screencap3.png', },
        { url: '../../../assets/images/qfd-screencap4.png', },
        { url: '../../../assets/images/qfd-screencap5.png', },
    ];

    imagesDerail: GALLERY_IMAGE[] = [
        { url: '../../../assets/images/logo_resized.png', },
        { url: '../../../assets/images/qfd-screencap1.png', },
        { url: '../../../assets/images/qfd-screencap2.png', },
        { url: '../../../assets/images/qfd-screencap3.png', },
        { url: '../../../assets/images/qfd-screencap4.png', },
        { url: '../../../assets/images/qfd-screencap5.png', },
    ];

    imagesDrum: GALLERY_IMAGE[] = [
        { url: '../../../assets/images/logo_resized.png', },
        { url: '../../../assets/images/qfd-screencap1.png', },
        { url: '../../../assets/images/qfd-screencap2.png', },
        { url: '../../../assets/images/qfd-screencap3.png', },
        { url: '../../../assets/images/qfd-screencap4.png', },
        { url: '../../../assets/images/qfd-screencap5.png', },
    ];

    imagesIP: GALLERY_IMAGE[] = [
        { url: '../../../assets/images/logo_resized.png', },
        { url: '../../../assets/images/qfd-screencap1.png', },
        { url: '../../../assets/images/qfd-screencap2.png', },
        { url: '../../../assets/images/qfd-screencap3.png', },
        { url: '../../../assets/images/qfd-screencap4.png', },
        { url: '../../../assets/images/qfd-screencap5.png', },
    ];

    constructor(public id: IDService) {}

    ngOnInit() {
        for (let i = 0; i < this.currentProjects.length; i++) {
            if (this.id.currentProject.includes(this.currentProjects[i])) {
                this.idExists = true;
            }
        }
    }

}
