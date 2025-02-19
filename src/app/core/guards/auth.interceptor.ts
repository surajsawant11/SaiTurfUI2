import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authToken = inject(AuthService).getAuthToken();
    const newReq = authToken
        ? req.clone({
            headers: req.headers.append('Authorization', `Bearer ${authToken}`)
        })
        : req;

    return next(newReq);
}
