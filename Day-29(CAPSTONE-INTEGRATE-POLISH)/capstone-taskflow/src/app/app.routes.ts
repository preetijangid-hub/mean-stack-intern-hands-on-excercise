import {
  Routes
} from '@angular/router';

import {
  Login
} from './features/auth/login/login';

import {
  Register
} from './features/auth/register/register';

import {
  Dashboard
} from './features/dashboard/dashboard';

import {
  Projects
} from './features/projects/projects';

import {
  Team
} from './features/team/team';

import {
  authGuard
} from './core/guards/auth-guard';

import {
  guestGuard
} from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'projects',
    component: Projects,
    canActivate: [authGuard]
  },
  {
    path: 'team',
    component: Team,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

/* The '' and '**' redirects send unauthenticated users to
   /dashboard, where authGuard immediately forwards them to
   /login; authenticated users land on the dashboard directly.
   This keeps a single source of truth (authGuard) for the
   auth-state decision. */