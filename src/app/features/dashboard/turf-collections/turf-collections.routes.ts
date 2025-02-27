import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TurfCollectionsComponent } from './turf-collections.component';
// import { BookingComponent } from './booking.component';
// import { BookEffects } from './store/booking.effects';
// import { bookReducer } from './store/booking.reducer';

export const TURF_COLLECTIONS_ROUTES: Routes = [
    {
        path: '',
        component: TurfCollectionsComponent,
        providers: [
            // provideState('book', bookReducer),
            // provideEffects([BookEffects]),
        ],
    },
    {
        path: ':id',
        component: TurfCollectionsComponent,
        providers: [
            // provideState('book', bookReducer),
            // provideEffects([BookEffects]),
        ],
    }
];