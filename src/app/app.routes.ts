import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AboutComponent } from './modules/dashboard/about/about.component';
import { ContactComponent } from './modules/dashboard/contact/contact.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/dashboard/home/home.routes').then(m => m.HOME_ROUTES),
            }
        ]
    }
];
