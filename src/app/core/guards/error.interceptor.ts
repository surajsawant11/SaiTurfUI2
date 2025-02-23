import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  // Import ToastrService

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('here')
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred!';

                if (error.error instanceof ErrorEvent) {
                    // Client-side or network error
                    errorMessage = `Client-side error: ${error.error.message}`;
                } else {
                    // Backend error
                    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;

                    // Handle specific status codes (e.g., 401 Unauthorized)
                    if (error.status === 401) {
                        // Redirect to login on 401 Unauthorized
                        this.router.navigate(['/login']);
                    } else if (error.status === 500) {
                        // Handle 500 Internal Server Error
                        this.toastr.error('Internal Server Error. Please try again later.', 'Error 500');
                    }
                }

                // Show error message using Toastr
                this.toastr.error(errorMessage, 'Error');

                // Propagate the error
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}

