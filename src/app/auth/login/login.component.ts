import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  loginTemplate = [
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' }
  ];
  loginError = false;

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe(users => {
      if (users.length > 0) {
        this.auth.setUser(users[0]);
        const role = users[0].role;
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/form/1']);
        }
      } else {
        this.loginError = true;
      }
    });
  }
}

