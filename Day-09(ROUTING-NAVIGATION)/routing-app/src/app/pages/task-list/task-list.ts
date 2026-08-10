import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private route = inject(ActivatedRoute);

  selectedStatus =
    this.route.snapshot.queryParamMap.get('status');

  tasks = [
    {
      id: 101,
      title: 'Learn Angular Routing',
      status: 'In Progress',
    },
    {
      id: 102,
      title: 'Build Task Detail Page',
      status: 'Completed',
    },
    {
      id: 103,
      title: 'Practice Lazy Loading',
      status: 'Pending',
    },
  ];
}