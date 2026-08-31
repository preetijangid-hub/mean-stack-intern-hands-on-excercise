import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  Task,
  resolveTaskProgress
} from '../../models/task.model';

import {
  TaskService
} from '../../core/services/task';

import {
  ProjectService
} from '../../core/services/project';

import {
  Header
} from '../../shared/components/header/header';

import {
  Sidebar
} from '../../shared/components/sidebar/sidebar';

import {
  HighlightDirective
} from '../../shared/directives/highlight.directive';

interface ProjectPerformance {
  project: string;
  color: string;
  description: string;
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  progress: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterLink,
    Header,
    Sidebar,
    HighlightDirective
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  private readonly taskService =
    inject(TaskService);

  private readonly projectService =
    inject(ProjectService);

  readonly sidebarOpen = signal(true);

  readonly isLoading = signal(true);

  readonly errorMessage = signal('');

  readonly tasks = signal<Task[]>([]);

  readonly projects =
    this.projectService.getProjects();

  readonly performances = computed<
    ProjectPerformance[]
  >(() => {
    const tasks = this.tasks();

    return this.projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) =>
          (task.project ||
            'General') === project.name
      );

      const total = projectTasks.length;

      const completed = projectTasks.filter(
        (task) =>
          task.status === 'completed'
      ).length;

      const inProgress = projectTasks.filter(
        (task) =>
          task.status === 'in-progress'
      ).length;

      const notStarted = projectTasks.filter(
        (task) =>
          task.status === 'pending'
      ).length;

      const progress = total
        ? Math.round(
            projectTasks.reduce(
              (sum, task) =>
                sum +
                resolveTaskProgress(task),
              0
            ) / total
          )
        : 0;

      return {
        project: project.name,
        color: project.color || '#4f46e5',
        description:
          project.description || '',
        total,
        completed,
        inProgress,
        notStarted,
        progress
      };
    });
  });

  readonly overallProgress = computed(() => {
    const tasks = this.tasks();

    if (!tasks.length) {
      return 0;
    }

    return Math.round(
      tasks.reduce(
        (sum, task) =>
          sum + resolveTaskProgress(task),
        0
      ) / tasks.length
    );
  });

  readonly totalTasks = computed(
    () => this.tasks().length
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(
      (open) => !open
    );
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.taskService
      .getTasks()
      .subscribe({
        next: (tasks) => {
          this.tasks.set(tasks || []);
          this.isLoading.set(false);
        },

        error: (error) => {
          this.errorMessage.set(
            error?.error?.message ||
              'Unable to load project data. Please try again.'
          );

          this.isLoading.set(false);
        }
      });
  }
}