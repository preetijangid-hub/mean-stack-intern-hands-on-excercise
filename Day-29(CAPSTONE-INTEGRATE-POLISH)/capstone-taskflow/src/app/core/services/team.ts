import { Injectable } from '@angular/core';

import {
  TeamMember
} from '../../models/team-member.model';

/* ============================================================
   TeamService — FRONTEND-ONLY for now.

   The live backend (Day-27 capstone API) exposes ONLY:
     /api/auth/*  and  /api/tasks/*
   There is NO /api/team endpoint and tasks have no
   assignedTo field server-side.

   Members are kept in localStorage as a clearly isolated
   fallback so the Team UI works today. Task assignment is
   stored via TaskMetadataService (also frontend-only).
   When the backend adds team support, swap the storage
   implementation below for HttpClient calls.
   ============================================================ */

const STORAGE_KEY = 'taskflow_team_members';

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    _id: 'member-preeti',
    name: 'Preeti Jangid',
    email: 'preeti@taskflow.app',
    role: 'Developer'
  },
  {
    _id: 'member-arjun',
    name: 'Arjun Mehta',
    email: 'arjun@taskflow.app',
    role: 'Designer'
  },
  {
    _id: 'member-sofia',
    name: 'Sofia Alvarez',
    email: 'sofia@taskflow.app',
    role: 'Product Manager'
  },
  {
    _id: 'member-liam',
    name: 'Liam Chen',
    email: 'liam@taskflow.app',
    role: 'QA Engineer'
  }
];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  /** Returns all team members (frontend fallback data). */
  getMembers(): TeamMember[] {
    try {
      const raw = localStorage.getItem(
        STORAGE_KEY
      );

      if (raw) {
        const parsed =
          JSON.parse(raw) as TeamMember[];

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      /* fall through to defaults */
    }

    return DEFAULT_MEMBERS;
  }

  /** Finds a member by id or name. */
  findMember(
    idOrName: string
  ): TeamMember | undefined {
    if (!idOrName) {
      return undefined;
    }

    const members = this.getMembers();

    return members.find(
      (member) =>
        member._id === idOrName ||
        member.name === idOrName
    );
  }

  /** Display name for a member id/name stored on a task. */
  memberName(idOrName: string): string {
    return this.findMember(idOrName)?.name || '';
  }

  /** Initials for avatar display. */
  initials(name: string): string {
    if (!name) {
      return '?';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  /** Adds a new team member (frontend-only persistence). */
  addMember(
    name: string,
    email: string,
    role: string
  ): TeamMember {
    const members = this.getMembers();

    const member: TeamMember = {
      _id: `member-${Date.now()}`,
      name,
      email,
      role
    };

    this.persist([...members, member]);

    return member;
  }

  private persist(
    members: TeamMember[]
  ): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(members)
      );
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }
}