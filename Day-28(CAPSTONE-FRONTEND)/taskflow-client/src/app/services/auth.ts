import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';

interface AuthResponse {
  token?: string;
  accessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'https://taskflow-api-zad8.onrender.com/api/auth';
  private readonly requestTimeoutMs = 10000;

  constructor(
    private http: HttpClient
  ) {}

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      user
    ).pipe(
      timeout(this.requestTimeoutMs),
      tap((response) => this.saveToken(response))
    );
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(

        timeout(this.requestTimeoutMs),
        tap((response) => this.saveToken(response))

      );
  }

  private saveToken(response: AuthResponse): void {

    const token = response.token || response.accessToken;

    if (!token) {
      throw new Error('Authentication succeeded but no token was returned.');
    }

    localStorage.setItem('token', token);

  }

  logout(): void {

    localStorage.removeItem('token');

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

}
