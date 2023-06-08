import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  login() {
    // Perform login logic here
    // if (this.username === 'dummy' && this.password === 'dummy') {
    // Login successful, navigate to the card display page
    this.router.navigate(['/card-display']);
    // } else {
    //   // Display error message for failed login
    //   this.errorMessage = 'Invalid username or password';
    // }
  }
}
