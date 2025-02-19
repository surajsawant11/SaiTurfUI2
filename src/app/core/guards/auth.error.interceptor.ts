import { ErrorHandler, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(private snackBar: MatSnackBar) {
    }
    // TODO
    handleError(error: any): void {
        console.error('An error occurred:', error);
        let errorMessage = 'An unexpected error occurred.';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (error?.statusText) {
            errorMessage = error.statusText || 'Something went wrong!';
        }

        // Test snackbar behavior
        setTimeout(() => {
            this.snackBar.open(errorMessage, 'Close', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
            });
        }, 0);

        if (this.isUnauthorized(error)) {
            inject(AuthService).logOut();
        }
    }

    private isUnauthorized(err: any): boolean {
        return err.status === 401 || err.status === 403;
    }
}
