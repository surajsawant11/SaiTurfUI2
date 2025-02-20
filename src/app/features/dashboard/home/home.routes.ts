import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { homeReducer } from './store/home.reducer';
import { HomeEffects } from './store/home.effects';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        providers: [
            provideState('home', homeReducer),
            provideEffects([HomeEffects]),
        ],
    },
];