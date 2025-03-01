import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createBooking, loadBookedDates } from '../store/turf-collections.actions';
import { selectBookedDates } from '../store/turf-collections.selectors';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

export interface Booking {
  id?: number;
  turfId: number;
  bookingDate: string; // ✅ Now stored as a string (yyyy-MM-dd)
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

@Component({
  selector: 'app-turf-collections-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './turf-collections-detail.component.html',
  styleUrls: ['./turf-collections-detail.component.css']
})
export class TurfCollectionsDetailComponent implements OnInit, OnDestroy {
  @Input() turf: any;
  @Output() close = new EventEmitter<void>();
  @ViewChild('picker') picker: MatDatepicker<Date>;

  bookingData = {
    bookingDate: '', // ✅ Now a string internally
    startTime: '',
    endTime: ''
  };

  private subscription: Subscription = new Subscription();
  bookedDates: string[] = [];
  minDate: Date = new Date();
  totalPrice: number = 0;

  constructor(private store: Store, private datePipe: DatePipe) {}

  ngOnInit() {
    if (this.turf) {
      this.store.dispatch(loadBookedDates({ turfId: this.turf.id }));

      this.subscription.add(
        this.store.pipe(select(selectBookedDates)).subscribe((dates) => {
          this.bookedDates = dates.map(date => this.datePipe.transform(date, 'yyyy-MM-dd')!);
        })
      );
    }
  }

  /** ✅ Disable already booked dates */
  /** ✅ Check if the given date is booked */
isDateBooked(date: Date | null): boolean {
  if (!date) return false; // If no date, it's not booked

  const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  return this.bookedDates.includes(formattedDate || '');
}
/** ✅ Disable already booked dates */
/** ✅ Allow all dates except booked ones */
disableDate = (date: Date | null): boolean => {
  if (!date) return false; // ✅ Allow selection if no date is given

  const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  return !this.bookedDates.includes(formattedDate!); // ✅ Block only booked dates
};




  /** ✅ Handles date selection (Converts Date → String) */
  onDateChange(event: any): void {
    const selectedDate: Date = event.value;

    if (!selectedDate) return;

    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

    if (this.bookedDates.includes(formattedDate!)) {
      this.bookingData.bookingDate = ''; // Reset to empty string
      Swal.fire({
        icon: 'error',
        title: '❌ Date Unavailable',
        text: 'This date is already booked. Please select another date.',
        confirmButtonText: 'OK'
      });
    } else {
      this.bookingData.bookingDate = formattedDate!; // ✅ Store as a string
    }
  }

  /** ✅ Convert `bookingDate` to a Date for the Datepicker */
  getBookingDateAsDate(): Date | null {
    return this.bookingData.bookingDate ? new Date(this.bookingData.bookingDate) : null;
  }

  /** ✅ Check if a given date is booked */
  /** ✅ Format date as 'yyyy-MM-dd' */
getFormattedDate(date: string | Date): string {
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
}


  validateBooking(): void {
    if (!this.bookingData.bookingDate) return;

    if (this.bookedDates.includes(this.bookingData.bookingDate)) {
      this.bookingData.bookingDate = '';
      Swal.fire({
        icon: 'error',
        title: '❌ Date Unavailable',
        text: 'This date is already booked. Please select another date.',
        confirmButtonText: 'OK'
      });
    }
  }

  bookNow() {
    console.log("Before Confirming:", this.bookingData.bookingDate);

    if (!this.bookingData.bookingDate || !this.bookingData.startTime || !this.bookingData.endTime) {
      Swal.fire({
        icon: 'warning',
        title: '❌ Missing Information',
        text: 'Please fill all booking details.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const newBooking: Booking = {
      turfId: this.turf?.id,
      bookingDate: this.bookingData.bookingDate, // ✅ String format
      startTime: this.bookingData.startTime,
      endTime: this.bookingData.endTime,
      totalPrice: this.totalPrice,
      status: 'PENDING'
    };

    Swal.fire({
      title: 'Confirm Your Booking',
      html: `
        <p><strong>Turf:</strong> ${this.turf?.name}</p>
        <p><strong>Date:</strong> ${this.bookingData.bookingDate}</p>
        <p><strong>Time:</strong> ${this.bookingData.startTime} - ${this.bookingData.endTime}</p>
        <p style="color: green; font-weight: bold;"><strong>Total Price:</strong> ₹${newBooking.totalPrice}</p>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '✅ Confirm',
      cancelButtonText: '❌ Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitBooking(newBooking);
      }
    });
  }

  submitBooking(booking: Booking) {
    this.store.dispatch(createBooking({ booking }));

    Swal.fire({
      icon: 'success',
      title: '✅ Booking Request Sent!',
      text: `Your booking is pending confirmation.`,
      confirmButtonText: 'OK'
    });
  }

  calculateTotalPrice() {
    if (this.bookingData.startTime && this.bookingData.endTime && this.turf?.pricePerHour) {
      const start = this.convertTimeToHours(this.bookingData.startTime);
      const end = this.convertTimeToHours(this.bookingData.endTime);

      if (end > start) {
        const totalHours = end - start;
        this.totalPrice = Math.floor(totalHours * this.turf.pricePerHour);
      } else {
        this.totalPrice = 0;
        alert("❌ End time must be greater than start time!");
      }
    } else {
      this.totalPrice = 0;
    }
  }

  convertTimeToHours(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  }

  closeDetails() {
    this.close.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
