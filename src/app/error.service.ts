import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorService {

    constructor(private snack: MatSnackBar) { }

    log(error: any) {
        this.snack.open(error.message, '', { duration: 4000 });
        console.error(error);
    }
}
