import { Component, Input } from '@angular/core';

const STYLE_MAP: Record<string, { bg: string; color: string }> = {
  Low: { bg: 'var(--tf-info-bg)', color: 'var(--tf-info)' },
  Medium: { bg: 'var(--tf-warning-bg)', color: 'var(--tf-warning)' },
  High: { bg: 'var(--tf-danger-bg)', color: 'var(--tf-danger)' },
  Pending: { bg: 'var(--tf-warning-bg)', color: 'var(--tf-warning)' },
  'In Progress': { bg: 'var(--tf-info-bg)', color: 'var(--tf-info)' },
  Completed: { bg: 'var(--tf-success-bg)', color: 'var(--tf-success)' },
};

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="tf-badge" [style.background]="style.bg" [style.color]="style.color">{{ text }}</span>`,
})
export class BadgeComponent {
  @Input() text = '';

  get style() {
    return STYLE_MAP[this.text] || { bg: 'var(--tf-bg)', color: 'var(--tf-text-muted)' };
  }
}
