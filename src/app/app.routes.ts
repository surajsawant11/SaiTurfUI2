import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { AboutComponent } from './modules/dashboard/about/about.component';
import { ContactComponent } from './modules/dashboard/contact/contact.component';
// import { HomeComponent } from './modules/dashboard/dashboard/home.component';
// import { UserDashboardComponent } from './modules/dashboard/user-dashboard/user-dashboard.component';
// import { OwnerDashboardComponent } from './modules/dashboard/owner-dashboard/owner-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dash', component: HomeComponent },

    // { path: 'user-dashboard', component: UserDashboardComponent },
    // { path: 'owner-dashboard', component: OwnerDashboardComponent },
  ];
