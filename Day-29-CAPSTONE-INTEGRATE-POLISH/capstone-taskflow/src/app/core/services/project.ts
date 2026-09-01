import { Injectable } from '@angular/core';

import { Project } from '../../models/project.model';

/* ============================================================
   ProjectService — FRONTEND-ONLY for now.

   The live backend (Day-27 capstone API) exposes ONLY:
     /api/auth/*  and  /api/tasks/*
   There is NO /api/projects endpoint yet.

   This service therefore keeps projects in localStorage as a
   clearly isolated fallback so the Projects UI works today.
   When the backend adds /api/projects, swap the storage
   implementation below for HttpClient calls — the public API
   of this service is designed to match that future contract.
   ============================================================ */

const STORAGE_KEY = 'taskflow_projects';

const DEFAULT_PROJECTS: Project[] = [
  {
    _id: 'project-general',
    name: 'General',
    description:
      'Everyday tasks that do not belong to a specific project.',
    color: '#64748b'
  },
  {
    _id: 'project-marketing',
    name: 'Marketing',
    description:
      'Campaigns, content and growth initiatives.',
    color: '#ec4899'
  },
  {
    _id: 'project-engineering',
    name: 'Engineering',
    description:
      'Product development, bugs and technical work.',
    color: '#0ea5e9'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  /** Returns all projects (frontend fallback data). */
  getProjects(): Project[] {
    try {
      const raw = localStorage.getItem(
        STORAGE_KEY
      );

      if (raw) {
        const parsed =
          JSON.parse(raw) as Project[];

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      /* fall through to defaults */
    }

    return DEFAULT_PROJECTS;
  }

  /** Finds a project by id or name. */
  findProject(
    idOrName: string
  ): Project | undefined {
    if (!idOrName) {
      return undefined;
    }

    const projects = this.getProjects();

    return projects.find(
      (project) =>
        project._id === idOrName ||
        project.name === idOrName
    );
  }

  /** Display name for a project id/name stored on a task. */
  projectName(idOrName: string): string {
    return this.findProject(idOrName)?.name || '';
  }

  /** Adds a new project (frontend-only persistence). */
  addProject(
    name: string,
    description = '',
    color = '#4f46e5'
  ): Project {
    const projects = this.getProjects();

    const project: Project = {
      _id: `project-${Date.now()}`,
      name,
      description,
      color
    };

    const updated = [...projects, project];

    this.persist(updated);

    return project;
  }

  private persist(
    projects: Project[]
  ): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(projects)
      );
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }
}