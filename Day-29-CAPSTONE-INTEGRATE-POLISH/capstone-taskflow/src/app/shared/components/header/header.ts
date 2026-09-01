import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() sidebarOpen = true;

  @Input() pageTitle = 'Dashboard';

  @Input() pageSubtitle =
    'Organize, track and complete your work';

  @Output() menuClick =
    new EventEmitter<void>();

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  readonly userMenuOpen = signal(false);

  get userName(): string {
    return (
      this.authService.getUser()?.name ||
      'User'
    );
  }

  get userEmail(): string {
    return (
      this.authService.getUser()?.email || ''
    );
  }

  get userInitials(): string {
    const name = this.userName.trim();

    if (!name) {
      return 'U';
    }

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join('');
  }

  toggleMenu(): void {
    this.menuClick.emit();
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(
      (open) => !open
    );
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.closeUserMenu();

    this.authService.logout();

    this.router.navigateByUrl('/login');
  }
}