import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import {
  ConfirmDialogComponent,
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BadgeComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks = signal<Task[]>([]);
  loading = signal(true);
  error = signal('');

  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';

  private searchSubject = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.searchSubject.pipe(debounceTime(350)).subscribe(() => this.loadTasks());
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  onSearchChange(): void {
    this.searchSubject.next();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set('');

    this.taskService
      .getTasks({
        search: this.searchTerm || undefined,
        status: this.statusFilter || undefined,
        priority: this.priorityFilter || undefined,
      })
      .subscribe({
        next: (res) => {
          this.tasks.set(res.data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load tasks. Please try again.');
          this.loading.set(false);
        },
      });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.loadTasks();
  }

  confirmDelete(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete task?',
        message: `Are you sure you want to delete "${task.title}"? This cannot be undone.`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteTask(task);
      }
    });
  }

  private deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((t) => t._id !== task._id));
        this.snackBar.open('Task deleted', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete task', 'Close', { duration: 3000 });
      },
    });
  }
}
