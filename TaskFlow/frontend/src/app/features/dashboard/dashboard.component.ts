import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../core/models/task.model';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  tasks = signal<Task[]>([]);
  loading = signal(true);
  error = signal('');

  totalTasks = computed(() => this.tasks().length);
  pendingCount = computed(() => this.tasks().filter((t) => t.status === 'Pending').length);
  inProgressCount = computed(() => this.tasks().filter((t) => t.status === 'In Progress').length);
  completedCount = computed(() => this.tasks().filter((t) => t.status === 'Completed').length);

  recentTasks = computed(() =>
    [...this.tasks()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  );

  highPriorityTasks = computed(() =>
    this.tasks()
      .filter((t) => t.priority === 'High' && t.status !== 'Completed')
      .slice(0, 5)
  );

  constructor(private taskService: TaskService, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load your tasks. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
