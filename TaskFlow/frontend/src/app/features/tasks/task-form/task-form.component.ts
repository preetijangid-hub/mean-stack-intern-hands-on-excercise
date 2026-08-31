import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  taskId: string | null = null;
  isEditMode = false;
  loading = signal(false);
  pageLoading = signal(false);

  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['Medium', [Validators.required]],
      status: ['Pending', [Validators.required]],
      dueDate: [''],
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.pageLoading.set(true);
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (res) => {
          const task = res.data;
          this.form.patchValue({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
          });
          this.pageLoading.set(false);
        },
        error: () => {
          this.snackBar.open('Could not load task', 'Close', { duration: 3000 });
          this.pageLoading.set(false);
          this.router.navigate(['/tasks']);
        },
      });
    }
  }

  get title() {
    return this.form.get('title');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const value = this.form.getRawValue() as any;

    const request$ =
      this.isEditMode && this.taskId
        ? this.taskService.updateTask(this.taskId, value)
        : this.taskService.createTask(value);

    request$.subscribe({
      next: (res) => {
        this.loading.set(false);
        this.snackBar.open(
          this.isEditMode ? 'Task updated successfully' : 'Task created successfully',
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(['/tasks', res.data._id]);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open(err.error?.message || 'Something went wrong', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
