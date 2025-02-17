import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  constructor(private authService:AuthService, private router: Router ){}
  username: string = 'admin';
  password: string = '123';

  submitForm(form: any) {
    // debugger
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          // Redirect to the Home component after successful login
          this.router.navigate(['home']);
        } else {
          alert("Wrong Username and Passsword") // Handle failed login logic if needed
        }
      });
      
    }
  }

}
