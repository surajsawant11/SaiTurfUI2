import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // constructor(private authService : AuthService, private router : Router){}
  logout(){
    // debugger
    // this.authService.isLogout();
    // this.router.navigate(['/login']);
  }
}
