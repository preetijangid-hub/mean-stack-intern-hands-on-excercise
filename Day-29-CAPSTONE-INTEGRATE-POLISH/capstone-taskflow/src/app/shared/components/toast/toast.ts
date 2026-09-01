import {
  Component,
  inject
} from '@angular/core';

import {
  NgClass
} from '@angular/common';

import {
  ToastService
} from '../../../core/services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  readonly toastService =
    inject(ToastService);

  close(): void {
    this.toastService.clear();
  }
}