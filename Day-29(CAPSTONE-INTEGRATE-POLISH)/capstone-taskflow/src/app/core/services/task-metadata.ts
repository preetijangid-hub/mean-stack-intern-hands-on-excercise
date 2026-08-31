import { Injectable } from '@angular/core';

/* ============================================================
   FRONTEND-ONLY task metadata layer.

   The live backend (Day-27 capstone API) persists only:
     title, description, status, priority

   It does NOT persist: progress, project, assignedTo.
   This service stores those fields locally (localStorage,
   keyed by task _id) so the UI can offer rich features
   WITHOUT pretending the API saves them.

   When the backend adds support for these fields, only this
   service needs to change — the rest of the app is ready.
   ============================================================ */

export interface TaskMetadata {
  progress?: number;
  project?: string;
  assignedTo?: string;
}

const STORAGE_KEY = 'taskflow_task_metadata';

@Injectable({
  providedIn: 'root'
})
export class TaskMetadataService {
  private cache: Record<string, TaskMetadata> =
    this.load();

  private load(): Record<string, TaskMetadata> {
    try {
      const raw = localStorage.getItem(
        STORAGE_KEY
      );

      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.cache)
      );
    } catch {
      /* storage unavailable — metadata stays in memory */
    }
  }

  get(taskId: string): TaskMetadata {
    return this.cache[taskId] || {};
  }

  set(
    taskId: string,
    metadata: TaskMetadata
  ): void {
    this.cache[taskId] = {
      ...this.cache[taskId],
      ...metadata
    };

    this.persist();
  }

  remove(taskId: string): void {
    delete this.cache[taskId];

    this.persist();
  }
}