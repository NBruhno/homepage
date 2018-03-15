import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LogService {
    constructor(private snack: MatSnackBar) {}

    error(message: any) {
        this.snack.open(message.message, '', { duration: 4000 });
        console.error(message);
    }

    warn(message: any) {
        if (isDevMode()) {
            console.warn(message);
        }
    }

    console(message: any) {
        if (isDevMode()) {
            console.log(message);
        }
    }
}
