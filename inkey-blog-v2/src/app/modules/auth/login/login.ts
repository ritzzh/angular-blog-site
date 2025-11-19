import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../core/services/common-service';
import { Router } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

onLogin() {
  if (this.loginForm.invalid) {
    alert("Please fill form correctly!");
    return;
  }

  const { email, password } = this.loginForm.value;

  this.commonService.validateLogin(email, password).then((result: string) => {
    switch (result) {
      case "Invalid-U":
        alert("The email is wrong or it does not exist");
        break;
      case "Invalid-P":
        alert("The password is wrong");
        break;
      case "Server-E":
        alert("Server error, try again");
        break;
      case "Valid":
        this.commonService.updateLoginStatus(true);
        this.router.navigate(['/dashboard']);
        break;
      default:
        alert("Ran into some error, try again");
    }
  });
}


validateLogin(email: string, password: string): Promise<string> {
  // Fake validation logic, replace with actual API call
  return new Promise((resolve) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      resolve('Valid');
    } else if (email !== 'admin@example.com') {
      resolve('Invalid-U');
    } else if (password !== 'admin123') {
      resolve('Invalid-P');
    } else {
      resolve('Server-E');
    }
  });
}


}
