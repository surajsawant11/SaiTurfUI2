import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTurfCollections } from './store/turf-collections.actions';
import { selectTurfs } from './store/turf-collections.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environment/environment';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {  TurfCollectionsDetailComponent } from './turf-collections-detail/turf-collections-detail.component';

@Component({
  selector: 'app-turf-collections',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, CommonModule, FormsModule,TurfCollectionsDetailComponent],
  templateUrl: './turf-collections.component.html',
  styleUrl: './turf-collections.component.css'
})
export class TurfCollectionsComponent implements OnInit, AfterViewInit {
  turfs$: Observable<any[]>;
  dataSource = new MatTableDataSource<any>(); 
  bookingData = { date: '', startTime: '', endTime: '', userId: 'USER_ID_HERE' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  // Hold the turf selected for detail view
  selectedTurf: any = null;

  constructor(private store: Store,  private http: HttpClient) {
    this.turfs$ = this.store.select(selectTurfs);
  }

  ngOnInit() {
    console.log('Dispatching loadTurfCollections action...');
    this.store.dispatch(loadTurfCollections());

    this.turfs$.subscribe((turfs) => {
      this.dataSource.data = turfs.map(turf => ({
        ...turf,
        // Optionally, format the image URL if needed:
        imageUrl: turf.imageUrl // or: `${environment.apiUrl}${turf.imageUrl}`
      }));
      console.log('Updated turfs with image URL:', this.dataSource.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(turf: any) {
    this.selectedTurf = turf;
  }

  closeDetails() {
    this.selectedTurf = null;
  }

   // Book Now Function
   bookNow() {
    if (!this.bookingData.date || !this.bookingData.startTime || !this.bookingData.endTime) {
      alert("Please select a valid date and time.");
      return;
    }

    const bookingPayload = {
      user_id: this.bookingData.userId,
      turf_id: this.selectedTurf.id,
      bookingDate: this.bookingData.date,
      startTime: this.bookingData.startTime,
      endTime: this.bookingData.endTime,
      totalPrice: this.calculatePrice(),
      status: 'CONFIRMED'
    };

    this.http.post(`${environment.apiUrl}/bookings`, bookingPayload).subscribe(
      response => {
        alert("Booking successful!");
        this.closeDetails();
      },
      error => {
        console.error("Booking failed:", error);
        alert("Booking failed. Try again!");
      }
    );
  }

  // Calculate total price
  calculatePrice(): number {
    const start = new Date(`1970-01-01T${this.bookingData.startTime}:00`);
    const end = new Date(`1970-01-01T${this.bookingData.endTime}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours * this.selectedTurf.pricePerHour;
  }
}
