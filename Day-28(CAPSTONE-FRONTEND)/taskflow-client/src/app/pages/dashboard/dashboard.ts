import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth';
import {
  Task,
  TaskInput,
  TaskPriority,
  TaskService,
  TaskStatus
} from '../../services/task';

type SortOption = 'newest' | 'oldest' | 'priority';
type RequestType = 'loading' | 'creating' | 'updating' | 'deleting' | '';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];
  searchTerm = '';
  statusFilter: 'all' | TaskStatus = 'all';
  priorityFilter: 'all' | TaskPriority = 'all';
  sortOption: SortOption = 'newest';

  isFormOpen = false;
  editingTask: Task | null = null;
  formError = '';
  feedbackMessage = '';
  requestType: RequestType = '';
  form: TaskInput = this.emptyForm();

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  get visibleTasks(): Task[] {
    const query = this.searchTerm.trim().toLowerCase();
    const priorityOrder: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

    return this.tasks
      .filter((task) => {
        const matchesSearch = !query || task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query);
        const matchesStatus = this.statusFilter === 'all' || task.status === this.statusFilter;
        const matchesPriority = this.priorityFilter === 'all' || task.priority === this.priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((first, second) => {
        if (this.sortOption === 'oldest') {
          return this.dateValue(first.createdAt) - this.dateValue(second.createdAt);
        }
        if (this.sortOption === 'priority') {
          return priorityOrder[first.priority] - priorityOrder[second.priority];
        }
        return this.dateValue(second.createdAt) - this.dateValue(first.createdAt);
      });
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get pendingTasks(): number {
    return this.tasks.filter((task) => task.status === 'pending').length;
  }

  get inProgressTasks(): number {
    return this.tasks.filter((task) => task.status === 'in-progress').length;
  }

  get completedTasks(): number {
    return this.tasks.filter((task) => task.status === 'completed').length;
  }

  loadTasks(): void {
    this.requestType = 'loading';
    this.taskService.getTasks()
      .pipe(finalize(() => (this.requestType = '')))
      .subscribe({
        next: (response) => (this.tasks = response.tasks),
        error: (error: unknown) => this.handleError(error, 'Unable to load your tasks.')
      });
  }

  openCreateForm(): void {
    this.editingTask = null;
    this.form = this.emptyForm();
    this.formError = '';
    this.isFormOpen = true;
  }

  openEditForm(task: Task): void {
    this.editingTask = task;
    this.form = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority
    };
    this.formError = '';
    this.isFormOpen = true;
  }

  closeForm(): void {
    if (!this.isSaving) {
      this.isFormOpen = false;
      this.formError = '';
    }
  }

  saveTask(): void {
    const title = this.form.title.trim();
    if (!title) {
      this.formError = 'A task title is required.';
      return;
    }

    const input: TaskInput = {
      title,
      description: this.form.description.trim(),
      status: this.form.status,
      priority: this.form.priority
    };
    this.formError = '';
    this.requestType = this.editingTask ? 'updating' : 'creating';
    const request = this.editingTask
      ? this.taskService.updateTask(this.editingTask._id, input)
      : this.taskService.createTask(input);

    request.pipe(finalize(() => {
      if (this.requestType !== 'loading') {
        this.requestType = '';
      }
    })).subscribe({
      next: () => {
        const message = this.editingTask ? 'Task updated successfully.' : 'Task created successfully.';
        this.isFormOpen = false;
        this.showFeedback(message);
        this.loadTasks();
        this.requestType = 'loading';
      },
      error: (error: unknown) => this.handleError(error, 'Unable to save this task.')
    });
  }

  deleteTask(task: Task): void {
    if (this.isBusy || !window.confirm(`Delete "${task.title}"?`)) {
      return;
    }

    this.requestType = 'deleting';
    this.taskService.deleteTask(task._id)
      .pipe(finalize(() => {
        if (this.requestType !== 'loading') {
          this.requestType = '';
        }
      }))
      .subscribe({
        next: () => {
          this.showFeedback('Task deleted successfully.');
          this.loadTasks();
          this.requestType = 'loading';
        },
        error: (error: unknown) => this.handleError(error, 'Unable to delete this task.')
      });
  }

  changeStatus(task: Task, status: TaskStatus): void {
    if (this.isBusy || task.status === status) {
      return;
    }

    const input: TaskInput = {
      title: task.title,
      description: task.description,
      status,
      priority: task.priority
    };
    this.requestType = 'updating';
    this.taskService.updateTask(task._id, input)
      .pipe(finalize(() => {
        if (this.requestType !== 'loading') {
          this.requestType = '';
        }
      }))
      .subscribe({
        next: () => {
          this.showFeedback('Task status updated.');
          this.loadTasks();
          this.requestType = 'loading';
        },
        error: (error: unknown) => this.handleError(error, 'Unable to update task status.')
      });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  get isLoading(): boolean {
    return this.requestType === 'loading';
  }

  get isSaving(): boolean {
    return this.requestType === 'creating' || this.requestType === 'updating';
  }

  get isBusy(): boolean {
    return this.requestType !== '';
  }

  statusLabel(status: TaskStatus): string {
    return status === 'in-progress' ? 'In progress' : status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
  }

  private emptyForm(): TaskInput {
    return { title: '', description: '', status: 'pending', priority: 'medium' };
  }

  private dateValue(date: string): number {
    return new Date(date).getTime();
  }

  private showFeedback(message: string): void {
    this.feedbackMessage = message;
    window.setTimeout(() => (this.feedbackMessage = ''), 3500);
  }

  private handleError(error: unknown, fallback: string): void {
    const status = this.getErrorStatus(error);
    if (status === 401 || status === 403) {
      this.authService.logout();
      void this.router.navigate(['/login']);
      return;
    }
    this.feedbackMessage = this.getErrorMessage(error, fallback);
  }

  private getErrorStatus(error: unknown): number | undefined {
    if (typeof error === 'object' && error !== null && 'status' in error) {
      return (error as { status?: number }).status;
    }
    return undefined;
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (this.getErrorStatus(error) === 0) {
      return 'The task service is unavailable. Please try again.';
    }
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const body = (error as { error?: { message?: string; errors?: { msg?: string }[] } }).error;
      return body?.message || body?.errors?.[0]?.msg || fallback;
    }
    return fallback;
  }
}
