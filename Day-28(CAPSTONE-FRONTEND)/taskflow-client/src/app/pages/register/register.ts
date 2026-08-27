import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({

        next: () => {

          this.router.navigate(['/dashboard']);

        },

        error: (error) => {

          console.error(
            'Registration Error:',
            error
          );

          this.errorMessage = this.getErrorMessage(error);

        }

      });

  }

  private getErrorMessage(error: any): string {

    if (error.name === 'TimeoutError') {
      return 'The server took too long to respond. Please try again.';
    }

    if (error.status === 0) {
      return 'The API could not be reached from the browser. Check the backend CORS configuration and try again.';
    }

    return error.error?.message || error.message || 'Registration failed';
  }

}
