import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BookingComponent } from './booking.component';
import { BookEffects } from './store/booking.effects';
import { bookReducer } from './store/booking.reducer';

export const BOOKING_ROUTES: Routes = [
    {
        path: '',
        component: BookingComponent,
        providers: [
            provideState('book', bookReducer),
            provideEffects([BookEffects]),
        ],
    },
    {
        path: ':id',
        component: BookingComponent,
        providers: [
            provideState('book', bookReducer),
            provideEffects([BookEffects]),
        ],
    }
];