import { Routes } from '@angular/router';

import { HomePage } from './pages/home/home';
import { TasksPage } from './pages/tasks/tasks';
import { CompletedPage } from './pages/completed/completed';
import { ReportsPage } from './pages/reports/reports';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'tasks',
    component: TasksPage
  },
  {
    path: 'completed',
    component: CompletedPage
  },
  {
    path: 'reports',
    component: ReportsPage
  },
  {
    path: '**',
    redirectTo: ''
  }
];