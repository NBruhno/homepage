import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsernameComponent } from "./profile/username/username.component";
import { AvatarComponent } from "./profile/avatar/avatar.component";

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {}

    openDialog(message: string, type: string): void {
        if (type === 'avatar') {
            const dialogRef = this.dialog.open(AvatarComponent, {
                data: { message: message }
            });

            dialogRef.afterClosed().subscribe(result => {
            });
        }

        if (type === 'username') {
            const dialogRef = this.dialog.open(UsernameComponent, {
                data: { message: message }
            });

            dialogRef.afterClosed().subscribe(result => {

            });
        }
    }
}

@Component({
    selector: 'alert-dialog',
    template: '<span mat-dialog-title>An error has occurred</span><p class="mat-body">{{data.message}}</p><button mat-button (click)="onNoClick();">Dismiss</button>',
})
export class AlertDialog {

    constructor(
        public dialogRef: MatDialogRef<AlertDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
