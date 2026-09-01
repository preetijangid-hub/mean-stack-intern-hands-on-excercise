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
  Task
} from '../../models/task.model';

import {
  TaskService
} from '../../core/services/task';

import {
  TeamService
} from '../../core/services/team';

import {
  Header
} from '../../shared/components/header/header';

import {
  Sidebar
} from '../../shared/components/sidebar/sidebar';

import {
  HighlightDirective
} from '../../shared/directives/highlight.directive';

type MemberSort =
  | 'performance'
  | 'name';

interface MemberPerformance {
  member: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  initials: string;
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  performance: number;
  averageProgress: number;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    RouterLink,
    Header,
    Sidebar,
    HighlightDirective
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit {
  private readonly taskService =
    inject(TaskService);

  private readonly teamService =
    inject(TeamService);

  readonly sidebarOpen = signal(true);

  readonly isLoading = signal(true);

  readonly errorMessage = signal('');

  readonly tasks = signal<Task[]>([]);

  readonly searchTerm = signal('');

  readonly sortBy = signal<MemberSort>(
    'performance'
  );

  readonly performances = computed<
    MemberPerformance[]
  >(() => {
    const tasks = this.tasks();

    const list =
      this.teamService
        .getMembers()
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

          const inProgress = assigned.filter(
            (task) =>
              task.status === 'in-progress'
          ).length;

          const notStarted = assigned.filter(
            (task) =>
              task.status === 'pending'
          ).length;

          const performance = total
            ? Math.round(
                (completed / total) * 100
              )
            : 0;

          const averageProgress = total
            ? Math.round(
                assigned.reduce(
                  (sum, task) =>
                    sum +
                    (task.progress ?? 0),
                  0
                ) / total
              )
            : 0;

          return {
            member: {
              _id: member._id,
              name: member.name,
              email: member.email,
              role: member.role
            },
            initials:
              this.teamService.initials(
                member.name
              ),
            total,
            completed,
            inProgress,
            notStarted,
            performance,
            averageProgress
          };
        });

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const filtered = search
      ? list.filter(
          (item) =>
            item.member.name
              .toLowerCase()
              .includes(search) ||
            item.member.role
              .toLowerCase()
              .includes(search) ||
            item.member.email
              .toLowerCase()
              .includes(search)
        )
      : list;

    if (this.sortBy() === 'name') {
      return [...filtered].sort((a, b) =>
        a.member.name.localeCompare(
          b.member.name
        )
      );
    }

    return [...filtered].sort(
      (a, b) =>
        b.performance - a.performance ||
        b.total - a.total
    );
  });

  readonly hasAssignments = computed(() =>
    this.tasks().some(
      (task) => !!task.assignedTo
    )
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(
      (open) => !open
    );
  }

  onSearch(
    event: Event
  ): void {
    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  setSort(sort: MemberSort): void {
    this.sortBy.set(sort);
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
              'Unable to load team data. Please try again.'
          );

          this.isLoading.set(false);
        }
      });
  }
}