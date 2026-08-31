import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  NgClass
} from '@angular/common';

import {
  AuthService
} from '../../../core/services/auth';

import {
  ProjectService
} from '../../../core/services/project';

export type SidebarFilter =
  | 'all'
  | 'pending'
  | 'in-progress'
  | 'completed';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @Input() isOpen = true;

  @Input() activeFilter:
    SidebarFilter = 'all';

  @Input() activeProject = '';

  @Input() statusCounts: {
    all: number;
    pending: number;
    'in-progress': number;
    completed: number;
  } = {
    all: 0,
    pending: 0,
    'in-progress': 0,
    completed: 0
  };

  @Output() filterChange =
    new EventEmitter<SidebarFilter>();

  @Output() projectChange =
    new EventEmitter<string>();

  @Output() menuClick =
    new EventEmitter<void>();

  private readonly authService =
    inject(AuthService);

  private readonly projectService =
    inject(ProjectService);

  private readonly router =
    inject(Router);

  readonly projects =
    this.projectService.getProjects();

  get currentRoute(): string {
    return this.router.url;
  }

  setFilter(
    filter: SidebarFilter
  ): void {
    this.activeFilter = filter;

    this.filterChange.emit(filter);
  }

  selectProject(
    projectName: string
  ): void {
    this.activeProject = projectName;

    this.projectChange.emit(projectName);
  }

  logout(): void {
    this.authService.logout();

    this.router.navigateByUrl('/login');
  }
}