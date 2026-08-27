import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface TaskListResponse {
  success: boolean;
  count: number;
  tasks: Task[];
}

interface TaskResponse {
  success: boolean;
  message?: string;
  task: Task;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl =
    'https://taskflow-api-zad8.onrender.com/api/tasks';

  constructor(
    private http: HttpClient
  ) {}

  getTasks(): Observable<TaskListResponse> {

    return this.http.get<TaskListResponse>(
      this.apiUrl
    );

  }

  createTask(task: TaskInput): Observable<TaskResponse> {

    return this.http.post<TaskResponse>(
      this.apiUrl,
      task
    );

  }

  updateTask(
    id: string,
    task: TaskInput
  ): Observable<TaskResponse> {

    return this.http.put<TaskResponse>(
      `${this.apiUrl}/${id}`,
      task
    );

  }

  deleteTask(
    id: string
  ): Observable<{ success: boolean; message?: string }> {

    return this.http.delete<{ success: boolean; message?: string }>(
      `${this.apiUrl}/${id}`
    );

  }

}