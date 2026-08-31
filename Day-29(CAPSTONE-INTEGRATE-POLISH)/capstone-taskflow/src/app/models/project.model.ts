export interface Project {
  _id: string;
  name: string;
  description?: string;

  color?: string;

  owner?: string;

  totalTasks?: number;
  completedTasks?: number;
  inProgressTasks?: number;
  notStartedTasks?: number;

  progress?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  color?: string;
}