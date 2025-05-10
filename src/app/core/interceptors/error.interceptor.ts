import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpStatusCode,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Assuming you're using Toastr for notifications

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            // Handle success responses
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
                    if (event.body && event.body.message) {
                        // If the backend returns a success message, show a success notification
                        const successMessage = event.body.message || 'Operation was successful!';
                        this.toastr.success(successMessage);
                    }
                }
            }),

            // Handle error responses
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unexpected error occurred';

                // Handle client-side errors
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Client-side error: ${error.error.message}`;
                    this.toastr.error(errorMessage);
                    return throwError(() => new Error(errorMessage));
                }

                // Handle server-side errors
                switch (error.status) {
                    case HttpStatusCode.Unauthorized: // 401
                        errorMessage = 'Unauthorized access. Please login again.';
                        this.handleUnauthorized();
                        break;

                    case HttpStatusCode.Forbidden: // 403
                        errorMessage = 'You do not have permission to access this resource.';
                        break;

                    case HttpStatusCode.NotFound: // 404
                        errorMessage = 'The requested resource was not found.';
                        break;

                    case HttpStatusCode.BadRequest: // 400
                        errorMessage = this.handleBadRequest(error);
                        break;

                    case HttpStatusCode.InternalServerError: // 500
                        errorMessage = 'A server error occurred. Please try again later.';
                        break;

                    case HttpStatusCode.GatewayTimeout: // 504
                    case HttpStatusCode.RequestTimeout: // 408
                        errorMessage = 'The request timed out. Please try again.';
                        break;

                    case 0: // When server is unreachable
                        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
                        break;

                    default:
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        break;
                }

                // Log error for debugging
                this.logError(error, errorMessage);

                // Show error notification
                this.toastr.error(errorMessage);

                // Return the error for further handling
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    private handleUnauthorized(): void {
        // Clear any stored tokens
        localStorage.removeItem('token');
    }

    private handleBadRequest(error: HttpErrorResponse): string {
        if (error.error?.errors && typeof error.error.errors === 'object') {
            // Handle validation errors
            const validationErrors = Object.values(error.error.errors);
            if (validationErrors.length > 0) {
                return validationErrors.join('\n');
            }
        }

        // Handle simple error message
        if (error.error?.message) {
            return error.error.message;
        }

        return 'Invalid request. Please check your data and try again.';
    }

    private logError(error: HttpErrorResponse, errorMessage: string): void {
        // In a production environment, you might want to send this to a logging service
        console.error('HTTP Error occurred:', {
            timestamp: new Date().toISOString(),
            path: error.url,
            error: error.error,
            message: errorMessage,
        });
    }
}
