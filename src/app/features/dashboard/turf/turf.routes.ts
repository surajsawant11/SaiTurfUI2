import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TurfComponent } from './turf.component';
import { turfReducer } from './store/turf.reducer';
import { TurfEffects } from './store/turf.effects';

export const TURF_ROUTES: Routes = [
    {
        path: '',
        component: TurfComponent,
        providers: [
            provideState('turf', turfReducer),
            provideEffects([TurfEffects]),
        ],
    },
];