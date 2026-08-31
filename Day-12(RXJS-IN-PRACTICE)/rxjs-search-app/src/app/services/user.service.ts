import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://jsonplaceholder.typicode.com/users';

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
