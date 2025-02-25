import { Routes } from '@angular/router';
import { adminGuard, authGuard, noAuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AboutComponent } from './features/dashboard/about/about.component';
import { ContactComponent } from './features/dashboard/contact/contact.component';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],  // Protect these routes
        children: [
            { path: '', loadChildren: () => import('./features/dashboard/home/home.routes').then(m => m.HOME_ROUTES), },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'turf', loadChildren: () => import('./features/dashboard/turf/turf.routes').then(m => m.TURF_ROUTES), canActivate: [adminGuard] },
            { path: 'book', loadChildren: () => import('./features/dashboard/booking/booking.routes').then(m => m.BOOKING_ROUTES) }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];
