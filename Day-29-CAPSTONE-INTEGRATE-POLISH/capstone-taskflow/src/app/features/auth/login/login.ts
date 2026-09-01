import {
  Component,
  inject
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  finalize
} from 'rxjs';

import {
  AuthService
} from '../../../core/services/auth';

import {
  ToastService
} from '../../../core/services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly fb = inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly toastService =
    inject(ToastService);

  private readonly router =
    inject(Router);

  isLoading = false;
  showPassword = false;
  errorMessage = '';

  readonly loginForm = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.toastService.show(
        'Please enter valid email and password.',
        'error'
      );

      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.toastService.show(
            'Login successful! Welcome back.',
            'success'
          );

          this.router.navigateByUrl('/dashboard');
        },

        error: (error) => {
          this.errorMessage =
            error?.error?.message ||
            'Login failed. Please check your credentials.';

          this.toastService.show(
            this.errorMessage,
            'error'
          );
        }
      });
  }
}