import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {

  private authService = inject(AuthService);
  private router = inject(Router);

  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Complete Day 14 Auth Guard and Interceptor work',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Prepare Internship Update',
      description: 'Share Day 14 progress with TL',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Test Protected Routes',
      description: 'Verify Auth Guard and login redirect',
      status: 'Completed'
    }
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}