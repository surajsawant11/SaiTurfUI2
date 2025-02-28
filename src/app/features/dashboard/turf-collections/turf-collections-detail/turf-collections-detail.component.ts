import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadBookedDates } from '../store/turf-collections.actions';
import { selectBookedDates } from '../store/turf-collections.selectors';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

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
    date: null as Date | null,
    startTime: '',
    endTime: ''
  };

  private subscription: Subscription = new Subscription();
  bookedDates: string[] = [];  // ✅ Converted to an array for ngFor
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

  /** ✅ Disable booked dates */
  disableDate = (date: Date | null): boolean => {
    if (!date) return false;
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.bookedDates.includes(formattedDate || '') || date < this.minDate;
  };

  /** ✅ Handles date selection */
  onDateChange(event: any): void {
    const selectedDate = event.value as Date;
    if (this.disableDate(selectedDate)) {
      this.bookingData.date = null;
      alert("❌ This date is unavailable. Please choose another date.");
    } else {
      this.bookingData.date = selectedDate;
    }
  }

  /** ✅ Format date for display */
  getFormattedDate(date: string | Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  /** ✅ Check if a given date is booked */
  isDateBooked(date: Date | null): boolean {
    if (!date) return false;
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.bookedDates.includes(formattedDate || '');
  }
  validateBooking(): void {
    if (this.isDateBooked(this.bookingData.date)) {
      alert('❌ This date is already booked. Please choose another date.');
      this.bookingData.date = null; // Reset the date field if it's booked
    }
  }
  
  bookNow() {
    if (!this.bookingData.date || !this.bookingData.startTime || !this.bookingData.endTime) {
      alert('❌ Please fill all booking details.');
      return;
    }
    alert(`✅ Booking confirmed for ${this.turf?.name}`);
  }

   // ✅ Ensure it's initialized

   calculateTotalPrice() {
    if (this.bookingData.startTime && this.bookingData.endTime && this.turf?.pricePerHour) {
      const start = this.convertTimeToHours(this.bookingData.startTime);
      const end = this.convertTimeToHours(this.bookingData.endTime);
  
      if (end > start) {
        const totalHours = end - start;
        this.totalPrice = Math.floor(totalHours * this.turf.pricePerHour); // ✅ Removes decimal points
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
