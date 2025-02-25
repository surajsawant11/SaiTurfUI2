import { NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBook, loadBookings } from './store/booking.actions';
import { selectBook, selectBookings } from './store/booking.selectors';

export interface Booking {
  bookingDate: string;
  endTime: string;
  id: number;
  startTime: string;
  status: string;
  totalPrice: number;
  turfId: number;
  userId: number;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgClass, MatIconModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookings$: Observable<Booking[]>; // Observable for the list of all bookings
  selectedBooking$: Observable<Booking>; // Observable for the selected booking details
  bookingId: number | null = null;

  // Table properties
  displayedViewDetailColumns: string[] = [
    'bookingDate',
    'startTime',
    'endTime',
    'status',
    'totalPrice',
    'turfName',
    'userName',
  ]; // Columns to display

  displayedColumns: string[] = [
    'bookingDate',
    'startTime',
    'endTime',
    'status',
    'totalPrice',
    'turfName',
    'userName',
    'actions',
  ]; // Columns to display
  dataSource = new MatTableDataSource<Booking>(); // Data source for the table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private store: Store, // Inject the NgRx Store
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if the route has an `id` parameter
    this.bookingId = +this.route.snapshot.paramMap.get('id')!;

    if (this.bookingId) {
      this.store.dispatch(loadBook({ bookingId: this.bookingId }));
      // If `id` is present, fetch and display the specific booking
      this.selectedBooking$ = this.store.select(selectBook);
      this.selectedBooking$.subscribe((booking) => {
        this.dataSource.data = booking ? [booking] : []; // Set data for the table
      });
    } else {
      // If `id` is not present, fetch and display all bookings
      this.store.dispatch(loadBookings());
      this.bookings$ = this.store.select(selectBookings);
      this.bookings$.subscribe((bookings) => {
        this.dataSource.data = bookings; // Set data for the table
      });
    }
  }

  ngAfterViewInit(): void {
    // Connect the paginator and sort to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filter function for the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewBookingDetails(bookingId: number): void {
    this.router.navigate(['/book', bookingId]); // Navigate to booking details page
  }

  goBack(): void {
    this.router.navigate(['/book']); // Navigate back to the bookings list
  }
}