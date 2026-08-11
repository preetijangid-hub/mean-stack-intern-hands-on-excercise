import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksPage {

  newTask = '';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Learn Angular Material',
      completed: true
    },
    {
      id: 2,
      title: 'Build Todo App',
      completed: false
    }
  ];

  displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'actions'
  ];

  addTask(): void {

    console.log('Add Task clicked');
    console.log('Input:', this.newTask);

    const title = this.newTask.trim();

    if (title === '') {
      console.log('Empty task');
      return;
    }

    const newTask: Task = {
      id: this.tasks.length + 1,
      title: title,
      completed: false
    };

    this.tasks = [
      ...this.tasks,
      newTask
    ];

    console.log('Tasks:', this.tasks);

    this.newTask = '';
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.tasks = [...this.tasks];
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(
      task => task.id !== id
    );
  }
}