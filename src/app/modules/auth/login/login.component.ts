import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../../core/store/auth.actions';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private store: Store) { }
  username: string = 'admin';
  password: string = 'admin';

  submitForm(form: any) {
    if (form.valid) {
      this.store.dispatch(login({ username: this.username, password: this.password }));
    }
  }

}
