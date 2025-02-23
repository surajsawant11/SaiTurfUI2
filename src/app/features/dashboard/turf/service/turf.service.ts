import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class TurfService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private store: Store) { }

    loadTurfs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/turfs`);
    }

    addTurf(formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/turfs/save`, formData);
    }

    deleteTurf(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/turfs/${id}`);
      }

}
