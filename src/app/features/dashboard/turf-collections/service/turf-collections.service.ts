import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Store } from '@ngrx/store';
import { Booking } from '../turf-collections-detail/turf-collections-detail.component';

@Injectable({
    providedIn: 'root',
})
export class TurfCollectionService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private store: Store) { }

    loadTurfsCollections(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/turfs`).pipe(
            tap(data => console.log('API Response:', data)) // Debugging
        );
    }

    loadBookedDates(turfId: number): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/bookings/booked-dates/${turfId}`).pipe(
            tap(dates => console.log(`Booked Dates for Turf ${turfId}:`, dates)) // Debugging
        );
    }
    
    createBooking(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
      }
    

}
    