import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  searchControl = new FormControl('', {
    nonNullable: true
  });

  loading = false;
  errorMessage = '';

  users$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    map(value => value.trim()),
    distinctUntilChanged(),

    switchMap(searchTerm => {
      this.loading = true;
      this.errorMessage = '';

      return this.userService.searchUsers(searchTerm).pipe(
        map(users => {
          if (!searchTerm) {
            return users;
          }

          const term = searchTerm.toLowerCase();

          return users.filter(user =>
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
          );
        }),

        catchError(() => {
          this.errorMessage =
            'Unable to search users. Please try again.';

          return of([]);
        }),

        map(users => {
          this.loading = false;
          return users;
        })
      );
    }),

    takeUntilDestroyed(this.destroyRef)
  );

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
