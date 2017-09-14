import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MzCardComponent } from 'ng2-materialize';

@Directive({
    selector: '[appFileDrop]'
})

export class FileDropDirective {

    @Output() filesDropped =  new EventEmitter<FileList>();
    @Output() filesHovered =  new EventEmitter<boolean>();

    constructor(private model: MzCardComponent) {  }

    @HostListener('drop', ['$event'])

    onDrop($event) {
        $event.preventDefault();
        const transfer = $event.dataTransfer;
        this.filesDropped.emit(transfer.files);
        this.filesHovered.emit(false);
        this.model.backgroundClass = 'white';
    }

    @HostListener('dragover', ['$event'])
    onDragOver($event) {
        event.preventDefault();
        this.filesHovered.emit(true);
        this.model.backgroundClass = 'dropCard';
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event) {
        this.filesHovered.emit(false);
        this.model.backgroundClass = 'white';
    }
}
