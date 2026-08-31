import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  task = signal<Task | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/tasks']);
      return;
    }

    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.task.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.status === 404 ? 'Task not found.' : 'Could not load this task.'
        );
        this.loading.set(false);
      },
    });
  }

  markCompleted(): void {
    const current = this.task();
    if (!current) return;

    this.taskService
      .updateTask(current._id, {
        title: current.title,
        description: current.description,
        priority: current.priority,
        status: 'Completed',
        dueDate: current.dueDate,
      })
      .subscribe({
        next: (res) => {
          this.task.set(res.data);
          this.snackBar.open('Task marked as completed', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to update task', 'Close', { duration: 3000 });
        },
      });
  }

  confirmDelete(): void {
    const current = this.task();
    if (!current) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete task?',
        message: `Are you sure you want to delete "${current.title}"? This cannot be undone.`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.taskService.deleteTask(current._id).subscribe({
          next: () => {
            this.snackBar.open('Task deleted', 'Close', { duration: 3000 });
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.snackBar.open('Failed to delete task', 'Close', { duration: 3000 });
          },
        });
      }
    });
  }
}
