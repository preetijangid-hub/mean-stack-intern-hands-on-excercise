import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  DatePipe,
  NgClass
} from '@angular/common';

import {
  finalize
} from 'rxjs';

import {
  Task,
  TaskStatus,
  TaskPriority,
  TaskFormData,
  CreateTaskPayload,
  UpdateTaskPayload,
  resolveTaskProgress,
  taskStatusLabel,
  taskPriorityLabel
} from '../../models/task.model';

import {
  TaskService
} from '../../core/services/task';

import {
  ProjectService
} from '../../core/services/project';

import {
  TeamService
} from '../../core/services/team';

import {
  ToastService
} from '../../core/services/toast';

import {
  Header
} from '../../shared/components/header/header';

import {
  Sidebar,
  SidebarFilter
} from '../../shared/components/sidebar/sidebar';

import {
  TaskStatusPipe
} from '../../shared/pipes/task-status.pipe';

import {
  HighlightDirective
} from '../../shared/directives/highlight.directive';

type SortOption =
  | 'newest'
  | 'oldest'
  | 'priority'
  | 'progress'
  | 'alphabetical';

interface ProjectPerformance {
  name: string;
  color: string;
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  progress: number;
}

interface MemberPerformance {
  name: string;
  role: string;
  initials: string;
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  performance: number;
}

const PRIORITY_ORDER: Record<
  TaskPriority,
  number
> = {
  high: 0,
  medium: 1,
  low: 2
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgClass,
    RouterLink,
    Header,
    Sidebar,
    TaskStatusPipe,
    HighlightDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private readonly taskService =
    inject(TaskService);

  private readonly projectService =
    inject(ProjectService);

  private readonly teamService =
    inject(TeamService);

  private readonly toastService =
    inject(ToastService);

  /* ---------- UI state ---------- */

  readonly sidebarOpen = signal(true);

  readonly isLoading = signal(true);

  readonly isSaving = signal(false);

  readonly deletingId = signal('');

  readonly errorMessage = signal('');

  /* ---------- Task data ---------- */

  readonly tasks = signal<Task[]>([]);

  /* ---------- Filters ---------- */

  readonly searchTerm = signal('');

  readonly statusFilter = signal<
    SidebarFilter | 'all'
  >('all');

  readonly priorityFilter = signal<
    TaskPriority | 'all'
  >('all');

  readonly projectFilter = signal('');

  readonly sortBy = signal<SortOption>(
    'newest'
  );

  readonly projects =
    this.projectService.getProjects();

  readonly members =
    this.teamService.getMembers();

  readonly memberName = (idOrName: string) =>
    this.teamService.memberName(idOrName);

  readonly statusLabel = taskStatusLabel;

  readonly priorityLabel = taskPriorityLabel;

  /* ---------- Derived: filtering + sorting ---------- */

  readonly filteredTasks = computed<Task[]>(
    () => {
      const search = this.searchTerm()
        .trim()
        .toLowerCase();

      const status = this.statusFilter();
      const priority = this.priorityFilter();
      const project = this.projectFilter();

      let list = this.tasks().filter((task) => {
        const matchesSearch =
          !search ||
          task.title
            .toLowerCase()
            .includes(search) ||
          (task.description || '')
            .toLowerCase()
            .includes(search);

        const matchesStatus =
          status === 'all' ||
          task.status === status;

        const matchesPriority =
          priority === 'all' ||
          task.priority === priority;

        const taskProject =
          task.project || 'General';

        const matchesProject =
          !project ||
          taskProject === project;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesProject
        );
      });

      const sort = this.sortBy();

      list = [...list].sort((a, b) => {
        switch (sort) {
          case 'oldest':
            return this.createdValue(a) -
              this.createdValue(b);

          case 'priority':
            return (
              PRIORITY_ORDER[a.priority] -
              PRIORITY_ORDER[b.priority]
            );

          case 'progress':
            return (
              resolveTaskProgress(b) -
              resolveTaskProgress(a)
            );

          case 'alphabetical':
            return a.title.localeCompare(
              b.title
            );

          default:
            return (
              this.createdValue(b) -
              this.createdValue(a)
            );
        }
      });

      return list;
    }
  );

  readonly hasActiveFilters = computed(() =>
    !!this.searchTerm().trim() ||
    this.statusFilter() !== 'all' ||
    this.priorityFilter() !== 'all' ||
    !!this.projectFilter()
  );

  /* ---------- Derived: summary stats ---------- */

  readonly totalTasks = computed(
    () => this.tasks().length
  );

  readonly completedCount = computed(
    () =>
      this.tasks().filter(
        (task) => task.status === 'completed'
      ).length
  );

  readonly inProgressCount = computed(
    () =>
      this.tasks().filter(
        (task) =>
          task.status === 'in-progress'
      ).length
  );

  readonly notStartedCount = computed(
    () =>
      this.tasks().filter(
        (task) => task.status === 'pending'
      ).length
  );

  readonly highPriorityCount = computed(
    () =>
      this.tasks().filter(
        (task) => task.priority === 'high'
      ).length
  );

  readonly mediumPriorityCount = computed(
    () =>
      this.tasks().filter(
        (task) => task.priority === 'medium'
      ).length
  );

  readonly lowPriorityCount = computed(
    () =>
      this.tasks().filter(
        (task) => task.priority === 'low'
      ).length
  );

  /** Progress used for display on task cards. */
  resolveProgress(task: Task): number {
    return resolveTaskProgress(task);
  }

  readonly completionRate = computed(() => {
    const total = this.totalTasks();

    if (!total) {
      return 0;
    }

    return Math.round(
      (this.completedCount() / total) * 100
    );
  });

  readonly averageProgress = computed(() => {
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

  readonly statusCounts = computed(() => ({
    all: this.totalTasks(),
    pending: this.notStartedCount(),
    'in-progress': this.inProgressCount(),
    completed: this.completedCount()
  }));

  /* ---------- Derived: project & member performance ---------- */

  readonly projectPerformance = computed<
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

      return {
        name: project.name,
        color:
          project.color || '#64748b',
        total,
        completed: projectTasks.filter(
          (task) =>
            task.status === 'completed'
        ).length,
        inProgress: projectTasks.filter(
          (task) =>
            task.status === 'in-progress'
        ).length,
        notStarted: projectTasks.filter(
          (task) =>
            task.status === 'pending'
        ).length,
        progress: total
          ? Math.round(
              projectTasks.reduce(
                (sum, task) =>
                  sum +
                  resolveTaskProgress(task),
                0
              ) / total
            )
          : 0
      };
    }).filter(
      (item) => item.total > 0
    );
  });

  readonly memberPerformance = computed<
    MemberPerformance[]
  >(() => {
    const tasks = this.tasks();

    return this.members
      .map((member) => {
        const assigned = tasks.filter(
          (task) =>
            (task.assignedTo ||
              '') === member.name
        );

        const total = assigned.length;

        const completed = assigned.filter(
          (task) =>
            task.status === 'completed'
        ).length;

        return {
          name: member.name,
          role: member.role,
          initials:
            this.teamService.initials(
              member.name
            ),
          total,
          completed,
          inProgress: assigned.filter(
            (task) =>
              task.status === 'in-progress'
          ).length,
          notStarted: assigned.filter(
            (task) =>
              task.status === 'pending'
          ).length,
          performance: total
            ? Math.round(
                (completed / total) * 100
              )
            : 0
        };
      })
      .filter(
        (item) => item.total > 0
      );
  });

  /* ---------- Task modal state ---------- */

  readonly showTaskModal = signal(false);

  readonly isEditMode = signal(false);

  readonly editingTaskId = signal('');

  readonly taskForm = signal<TaskFormData>(
    this.emptyForm()
  );

  readonly formSubmitted = signal(false);

  readonly formError = computed(() => {
    if (!this.formSubmitted()) {
      return '';
    }

    return this.taskForm().title.trim()
      ? ''
      : 'Task title is required.';
  });

  readonly modalStatuses: Array<{
    value: TaskStatus;
    label: string;
  }> = [
    {
      value: 'pending',
      label: 'Not Started'
    },
    {
      value: 'in-progress',
      label: 'In Progress'
    },
    {
      value: 'completed',
      label: 'Completed'
    }
  ];

  readonly modalPriorities: Array<{
    value: TaskPriority;
    label: string;
  }> = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  /* ---------- Delete confirmation ---------- */

  readonly confirmDeleteId = signal('');

  readonly confirmDeleteTitle = signal('');

  ngOnInit(): void {
    this.loadTasks();
  }

  /* ---------- Data loading ---------- */

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
              'Unable to load tasks. Please try again.'
          );

          this.toastService.show(
            this.errorMessage(),
            'error'
          );

          this.isLoading.set(false);
        }
      });
  }

  /* ---------- Sidebar / filter handlers ---------- */

  toggleSidebar(): void {
    this.sidebarOpen.update(
      (open) => !open
    );
  }

  onFilterChange(
    filter: SidebarFilter
  ): void {
    this.statusFilter.set(filter);
    this.projectFilter.set('');
  }

  onProjectChange(
    project: string
  ): void {
    this.projectFilter.set(
      this.projectFilter() === project
        ? ''
        : project
    );
  }

  onSearch(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  onStatusFilter(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.statusFilter.set(
      select.value as SidebarFilter
    );
  }

  onPriorityFilter(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.priorityFilter.set(
      select.value as TaskPriority | 'all'
    );
  }

  onProjectFilter(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.projectFilter.set(select.value);
  }

  onSortChange(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.sortBy.set(
      select.value as SortOption
    );
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.priorityFilter.set('all');
    this.projectFilter.set('');
    this.sortBy.set('newest');
  }

  /* ---------- Task modal ---------- */

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingTaskId.set('');
    this.formSubmitted.set(false);
    this.taskForm.set(this.emptyForm());
    this.showTaskModal.set(true);
  }

  openEditModal(task: Task): void {
    this.isEditMode.set(true);
    this.editingTaskId.set(task._id);
    this.formSubmitted.set(false);
    this.taskForm.set({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      progress: resolveTaskProgress(task),
      project: task.project || '',
      assignedTo: task.assignedTo || ''
    });
    this.showTaskModal.set(true);
  }

  closeModal(): void {
    if (this.isSaving()) {
      return;
    }

    this.showTaskModal.set(false);
    this.isEditMode.set(false);
    this.editingTaskId.set('');
    this.formSubmitted.set(false);
  }

  /* Form field updates (signal-based) */

  updateForm(
    patch: Partial<TaskFormData>
  ): void {
    this.taskForm.update((form) => {
      const next = { ...form, ...patch };

      /* Progress <-> status consistency rules */
      if (
        patch.status !== undefined &&
        patch.status !== form.status
      ) {
        if (patch.status === 'completed') {
          next.progress = 100;
        } else if (
          patch.status === 'pending'
        ) {
          next.progress = 0;
        } else if (
          next.progress === 0 ||
          next.progress === 100
        ) {
          next.progress = 50;
        }
      }

      if (
        patch.progress !== undefined &&
        patch.progress !== form.progress
      ) {
        if (patch.progress >= 100) {
          next.status = 'completed';
          next.progress = 100;
        } else if (
          patch.progress <= 0
        ) {
          next.status = 'pending';
          next.progress = 0;
        } else if (
          next.status !== 'in-progress'
        ) {
          next.status = 'in-progress';
        }
      }

      return next;
    });
  }

  saveTask(): void {
    this.formSubmitted.set(true);

    const form = this.taskForm();

    const title = form.title.trim();

    if (!title) {
      return;
    }

    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);

    /* Only backend-supported fields go to the API. */
    const apiPayload: CreateTaskPayload = {
      title,
      description:
        form.description.trim(),
      status: form.status,
      priority: form.priority
    };

    /* Frontend-only metadata (never sent to API). */
    const metadata = {
      progress: form.progress,
      project: form.project,
      assignedTo: form.assignedTo
    };

    if (this.isEditMode()) {
      this.updateTask(
        apiPayload as UpdateTaskPayload,
        metadata
      );
    } else {
      this.createTask(
        apiPayload,
        metadata
      );
    }
  }

  private createTask(
    payload: CreateTaskPayload,
    metadata: {
      progress: number;
      project: string;
      assignedTo: string;
    }
  ): void {
    this.taskService
      .createTask(payload)
      .pipe(
        finalize(() =>
          this.isSaving.set(false)
        )
      )
      .subscribe({
        next: (task) => {
          this.taskService.saveMetadata(
            task._id,
            metadata
          );

          const decorated: Task = {
            ...task,
            ...metadata
          };

          this.tasks.update((tasks) => [
            decorated,
            ...tasks
          ]);

          this.toastService.show(
            'Task created successfully.',
            'success'
          );

          this.closeModal();
        },

        error: (error) => {
          this.toastService.show(
            error?.error?.message ||
              'Unable to create task.',
            'error'
          );
        }
      });
  }

  private updateTask(
    payload: UpdateTaskPayload,
    metadata: {
      progress: number;
      project: string;
      assignedTo: string;
    }
  ): void {
    const id = this.editingTaskId();

    this.taskService
      .updateTask(id, payload)
      .pipe(
        finalize(() =>
          this.isSaving.set(false)
        )
      )
      .subscribe({
        next: (updated) => {
          this.taskService.saveMetadata(
            id,
            metadata
          );

          const decorated: Task = {
            ...updated,
            ...metadata
          };

          this.tasks.update((tasks) =>
            tasks.map((task) =>
              task._id === id
                ? decorated
                : task
            )
          );

          this.toastService.show(
            'Task updated successfully.',
            'success'
          );

          this.closeModal();
        },

        error: (error) => {
          this.toastService.show(
            error?.error?.message ||
              'Unable to update task.',
            'error'
          );
        }
      });
  }

  /* ---------- Quick status cycling ---------- */

  cycleStatus(task: Task): void {
    const order: TaskStatus[] = [
      'pending',
      'in-progress',
      'completed'
    ];

    const next =
      order[
        (order.indexOf(task.status) + 1) %
          order.length
      ];

    const metadata = {
      progress:
        next === 'completed'
          ? 100
          : next === 'pending'
            ? 0
            : Math.max(
                task.progress ?? 50,
                1
              )
    };

    this.taskService
      .updateTask(task._id, {
        status: next
      })
      .subscribe({
        next: (updated) => {
          this.taskService.saveMetadata(
            task._id,
            metadata
          );

          const decorated: Task = {
            ...updated,
            progress: metadata.progress,
            project: task.project,
            assignedTo: task.assignedTo
          };

          this.tasks.update((tasks) =>
            tasks.map((item) =>
              item._id === task._id
                ? decorated
                : item
            )
          );

          this.toastService.show(
            `Task moved to ${taskStatusLabel(next)}.`,
            'success'
          );
        },

        error: (error) => {
          this.toastService.show(
            error?.error?.message ||
              'Unable to update task status.',
            'error'
          );
        }
      });
  }

  /* ---------- Delete with confirmation ---------- */

  requestDelete(task: Task): void {
    this.confirmDeleteId.set(task._id);
    this.confirmDeleteTitle.set(task.title);
  }

  cancelDelete(): void {
    this.confirmDeleteId.set('');
    this.confirmDeleteTitle.set('');
  }

  confirmDelete(): void {
    const id = this.confirmDeleteId();

    if (!id || this.deletingId()) {
      return;
    }

    this.deletingId.set(id);

    this.taskService
      .deleteTask(id)
      .pipe(
        finalize(() => {
          this.deletingId.set('');
          this.cancelDelete();
        })
      )
      .subscribe({
        next: () => {
          this.taskService.clearMetadata(id);

          this.tasks.update((tasks) =>
            tasks.filter(
              (task) => task._id !== id
            )
          );

          this.toastService.show(
            'Task deleted successfully.',
            'success'
          );
        },

        error: (error) => {
          this.toastService.show(
            error?.error?.message ||
              'Unable to delete task.',
            'error'
          );
        }
      });
  }

  /* ---------- Helpers ---------- */

  trackByTaskId(
    index: number,
    task: Task
  ): string {
    return task._id;
  }

  private createdValue(
    task: Task
  ): number {
    const time = task.createdAt
      ? new Date(task.createdAt).getTime()
      : 0;

    return Number.isNaN(time)
      ? 0
      : time;
  }

  private emptyForm(): TaskFormData {
    return {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      progress: 0,
      project: '',
      assignedTo: ''
    };
  }
}