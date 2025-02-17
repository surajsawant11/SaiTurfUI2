import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` // Set the token in the Authorization header
                }
            });
        }

        return next.handle(request);
    }
}