import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = signal<boolean>(
    localStorage.getItem('token') !== null
  );

  isLoggedIn() {
    return this.loggedIn();
  }

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === '1234') {

      localStorage.setItem('token', 'demo-token-12345');

      this.loggedIn.set(true);

      return true;
    }

    return false;
  }

  logout() {

    localStorage.removeItem('token');

    this.loggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}