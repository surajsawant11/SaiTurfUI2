import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/actions/auth/auth.actions';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private store = inject(Store);
  private router = inject(Router);

  dropdownOpen = false;

  logout() {
    this.store.dispatch(logout())
  }

  onHover(isHovering: boolean): void {
    this.dropdownOpen = isHovering;
  }

 navigateToHome() {
    this.router.navigate(['/'])
  }
}
