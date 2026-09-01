/* ============================================================
   Task model — matches the live backend contract exactly.

   Backend (Day-27 capstone API) Task schema:
     title:       string  (required)
     description: string  (default "")
     status:      'pending' | 'in-progress' | 'completed'
     priority:    'low' | 'medium' | 'high'
     user:        ObjectId (set server-side from JWT)
     createdAt / updatedAt: Date (timestamps: true)

   Fields the backend does NOT persist:
     progress / project / assignedTo
   These are kept as a clearly separated FRONTEND-ONLY
   metadata layer (see task-metadata.service.ts) so the UI
   works fully without pretending the API stores them.
   ============================================================ */

/** Status values exactly as the backend enum defines them. */
export type TaskStatus =
  | 'pending'
  | 'in-progress'
  | 'completed';

/** Priority values exactly as the backend enum defines them. */
export type TaskPriority =
  | 'low'
  | 'medium'
  | 'high';

/** A task as returned by the live API. */
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  user?: string;
  createdAt?: string;
  updatedAt?: string;

  /* Frontend-only metadata (never sent to the API):
     merged onto the task object by TaskService for convenience. */
  progress?: number;
  project?: string;
  assignedTo?: string;
}

/** Payload accepted by POST /api/tasks (backend-supported fields only). */
export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

/** Payload accepted by PUT /api/tasks/:id (all optional). */
export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

/** Full form model used by the Add/Edit task modal. */
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  project: string;
  assignedTo: string;
}

/** Derives the 0–100 progress value for a task. */
export function resolveTaskProgress(
  task: Pick<Task, 'status' | 'progress'>
): number {
  if (task.status === 'completed') {
    return 100;
  }

  if (task.status === 'pending') {
    return task.progress ?? 0;
  }

  // in-progress: keep stored metadata, default 50.
  return task.progress ?? 50;
}

/** Maps a status to a human-friendly label. */
export function taskStatusLabel(
  status: TaskStatus | string | undefined
): string {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'pending':
      return 'Not Started';
    default:
      return 'Unknown';
  }
}

/** Maps a priority to a human-friendly label. */
export function taskPriorityLabel(
  priority: TaskPriority | string | undefined
): string {
  switch (priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
}