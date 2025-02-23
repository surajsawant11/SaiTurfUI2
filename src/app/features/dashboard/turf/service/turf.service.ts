import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Store } from '@ngrx/store';
import { selectTurfs } from '../store/turf.selectors';

@Injectable({
    providedIn: 'root',
})
export class TurfService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private store: Store) { }

    loadTurfs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/turfs`);
    }
}
