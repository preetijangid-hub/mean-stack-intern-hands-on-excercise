import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import {
  AuthResponse,
  User
} from '../../models/auth.model';

/* ============================================================
   AuthService — live capstone auth API.

   Token storage: single consistent key `token`.
   Includes JWT expiry validation so an expired token no
   longer counts as "logged in" after a page refresh.
   ============================================================ */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL =
    'https://capstone-9pn7.onrender.com/api/auth';

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private readonly currentUserSignal =
    signal<User | null>(
      this.getStoredUser()
    );

  readonly currentUser =
    this.currentUserSignal.asReadonly();

  readonly isLoggedIn = computed(() =>
    this.hasValidToken()
  );

  constructor(private http: HttpClient) {}

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/register`,
        data
      )
      .pipe(
        tap((response) => {
          this.saveAuth(response);
        })
      );
  }

  login(data: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/login`,
        data
      )
      .pipe(
        tap((response) => {
          this.saveAuth(response);
        })
      );
  }

  private saveAuth(
    response: AuthResponse
  ): void {
    if (!response?.token) {
      throw new Error(
        'Authentication token was not received.'
      );
    }

    localStorage.setItem(
      this.TOKEN_KEY,
      response.token
    );

    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify(response.user)
    );

    this.currentUserSignal.set(
      response.user
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      this.TOKEN_KEY
    );
  }

  getUser(): User | null {
    return this.getStoredUser();
  }

  /**
   * A token is valid when it exists AND (if it is a JWT
   * with an `exp` claim) it has not expired. Tokens without
   * a parsable exp claim are treated as valid — the server
   * remains the source of truth via 401 handling.
   */
  hasValidToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const expiry =
      this.getTokenExpiry(token);

    if (expiry === null) {
      return true;
    }

    return expiry > Date.now();
  }

  /** Returns expiry in ms since epoch, or null if unknown. */
  private getTokenExpiry(
    token: string
  ): number | null {
    try {
      const payloadPart =
        token.split('.')[1];

      if (!payloadPart) {
        return null;
      }

      const normalized =
        payloadPart.replace(/-/g, '+').replace(/_/g, '/');

      const padded = normalized.padEnd(
        normalized.length +
          ((4 - (normalized.length % 4)) % 4),
        '='
      );

      const payload = JSON.parse(
        decodeURIComponent(
          window
            .atob(padded)
            .split('')
            .map(
              (char) =>
                '%' +
                (
                  '00' +
                  char.charCodeAt(0).toString(16)
                ).slice(-2)
            )
            .join('')
        )
      );

      if (
        payload &&
        typeof payload.exp === 'number'
      ) {
        return payload.exp * 1000;
      }

      return null;
    } catch {
      return null;
    }
  }

  private getStoredUser(): User | null {
    try {
      const user = localStorage.getItem(
        this.USER_KEY
      );

      return user
        ? JSON.parse(user)
        : null;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(
      this.TOKEN_KEY
    );

    localStorage.removeItem(
      this.USER_KEY
    );

    this.currentUserSignal.set(null);
  }
}