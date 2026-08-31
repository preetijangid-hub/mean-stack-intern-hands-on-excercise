import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload
} from '../../models/task.model';

import {
  TaskMetadataService
} from './task-metadata';

/* ============================================================
   TaskService — talks to the live capstone API.

   API contract (Day-27 backend):
     GET    /api/tasks        -> { success, count, tasks: Task[] }
     POST   /api/tasks        -> { success, message, task }
     PUT    /api/tasks/:id    -> { success, message, task }
     DELETE /api/tasks/:id    -> { success, message }

   Only backend-supported fields are ever sent:
     title, description, status, priority
   ============================================================ */

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL =
    'https://capstone-9pn7.onrender.com/api/tasks';

  private readonly http = inject(HttpClient);

  private readonly metadataService = inject(
    TaskMetadataService
  );

  /** Normalizes an API task + attaches frontend-only metadata. */
  private decorate(task: Task): Task {
    const metadata =
      this.metadataService.get(task._id);

    return {
      ...task,
      description: task.description || '',
      status: task.status || 'pending',
      priority: task.priority || 'medium',
      progress: metadata.progress,
      project: metadata.project,
      assignedTo: metadata.assignedTo
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<{
        success?: boolean;
        tasks?: Task[];
      }>(this.API_URL)
      .pipe(
        map((response) => {
          const tasks =
            response?.tasks ||
            (Array.isArray(response)
              ? (response as unknown as Task[])
              : []);

          return tasks.map((task) =>
            this.decorate(task)
          );
        })
      );
  }

  createTask(
    data: CreateTaskPayload
  ): Observable<Task> {
    return this.http
      .post<{ task: Task }>(this.API_URL, data)
      .pipe(
        map((response) =>
          this.decorate(response.task)
        )
      );
  }

  updateTask(
    id: string,
    data: UpdateTaskPayload
  ): Observable<Task> {
    return this.http
      .put<{ task: Task }>(
        `${this.API_URL}/${id}`,
        data
      )
      .pipe(
        map((response) =>
          this.decorate(response.task)
        )
      );
  }

  deleteTask(id: string): Observable<void> {
    return this.http
      .delete(`${this.API_URL}/${id}`)
      .pipe(map(() => void 0));
  }

  /** Persists frontend-only metadata for a task. */
  saveMetadata(
    taskId: string,
    metadata: {
      progress?: number;
      project?: string;
      assignedTo?: string;
    }
  ): void {
    this.metadataService.set(
      taskId,
      metadata
    );
  }

  /** Removes frontend-only metadata for a deleted task. */
  clearMetadata(taskId: string): void {
    this.metadataService.remove(taskId);
  }
}