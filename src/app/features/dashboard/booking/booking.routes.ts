import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { BookingComponent } from './booking.component';
import { bookReducer } from './store/booking.reducer';
import { BookEffects } from './store/booking.effects';

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