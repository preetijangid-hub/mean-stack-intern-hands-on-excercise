export interface TeamMember {
  _id: string;
  name: string;
  email: string;

  role: string;

  avatar?: string;

  totalTasks?: number;
  completedTasks?: number;
  inProgressTasks?: number;
  notStartedTasks?: number;

  performance?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface UpdateTeamMemberRequest {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}