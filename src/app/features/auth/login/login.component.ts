import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required, Validators.minLength(3)]],
      password: ['admin', [Validators.required, Validators.minLength(3)]]
    })
  }

  submitForm() {
    const formValue = this.loginForm.getRawValue()
    if (this.loginForm.valid) {
      this.store.dispatch(login({ username: formValue?.username, password: formValue?.password }));
    }
  }

}
