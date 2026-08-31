import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  users$ = this.userService.getUsers();

  loading = true;
  errorMessage = '';

  constructor() {
    this.users$ = this.userService.getUsers().pipe(
      catchError(() => {
        this.errorMessage = 'Unable to load users. Please try again.';
        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
