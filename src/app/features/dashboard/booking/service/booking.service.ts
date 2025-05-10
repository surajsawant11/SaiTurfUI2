import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Fetch all turfs
    getBookings(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/bookings`);
    }

    // Fetch a specific turf by ID
    getBookingById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/bookings/${id}`);
    }
}