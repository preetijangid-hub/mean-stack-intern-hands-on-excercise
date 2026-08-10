import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },

  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/task-list/task-list').then((m) => m.TaskList),
  },

  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./pages/task-detail/task-detail').then((m) => m.TaskDetail),
  },

  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports').then((m) => m.Reports),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];