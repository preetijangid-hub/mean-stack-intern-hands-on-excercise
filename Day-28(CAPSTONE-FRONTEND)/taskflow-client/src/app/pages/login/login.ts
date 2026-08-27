import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService
      .login({
        email: this.email,
        password: this.password
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({

        next: () => {

          this.router.navigate([
            '/dashboard'
          ]);

        },

        error: (error) => {

          console.error(
            'Login Error:',
            error
          );

          this.errorMessage =
            error.name === 'TimeoutError'
              ? 'The server took too long to respond. Please try again.'
              : error.status === 0
                ? 'The API could not be reached from the browser. Check the backend CORS configuration and try again.'
                : error.error?.message || error.message || 'Login failed';

        }

      });

  }

}
