import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private http = inject(HttpClient);

  responseMessage = '';

  testInterceptor() {

    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.responseMessage = 'HTTP request successful. Check Console → Network.';
        },

        error: (error) => {
          console.error('API Error:', error);
          this.responseMessage = 'Request failed. Check Console.';
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}