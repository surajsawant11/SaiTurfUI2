import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/actions/auth/auth.actions';
import { HasRoleDirective } from '../../../shared/directive/role.directive';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, HasRoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private store = inject(Store);
  private router = inject(Router);

  isMenuOpen = false; // For the mobile menu
  dropdownOpen = false; // For the user menu dropdown

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

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
