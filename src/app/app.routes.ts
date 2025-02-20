import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AboutComponent } from './features/dashboard/about/about.component';
import { ContactComponent } from './features/dashboard/contact/contact.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] },

    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./features/dashboard/home/home.routes').then(m => m.HOME_ROUTES),
            }
        ]
    },

    { path: '**', component: NotFoundComponent },
];
