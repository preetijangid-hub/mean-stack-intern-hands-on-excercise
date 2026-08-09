import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {

    this.errorMessage = '';

    const success = this.authService.login(
      this.username,
      this.password
    );

    if (success) {

      this.router.navigate(['/dashboard']);

    } else {

      this.errorMessage = 'Invalid username or password';

    }
  }
}