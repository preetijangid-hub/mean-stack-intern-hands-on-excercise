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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
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

  readonly registerForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
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

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      this.toastService.show(
        'Please complete all fields correctly.',
        'error'
      );

      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService
      .register(this.registerForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.toastService.show(
            'Registration successful! Welcome to TaskFlow.',
            'success'
          );

          this.router.navigateByUrl('/dashboard');
        },

        error: (error) => {
          this.errorMessage =
            error?.error?.message ||
            'Registration failed. Please try again.';

          this.toastService.show(
            this.errorMessage,
            'error'
          );
        }
      });
  }
}