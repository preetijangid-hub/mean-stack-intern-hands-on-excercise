import {
  Injectable,
  signal
} from '@angular/core';

export type ToastType =
  | 'success'
  | 'error'
  | 'info';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSignal =
    signal<ToastMessage | null>(null);

  readonly toast =
    this.toastSignal.asReadonly();

  private timeoutId:
    ReturnType<typeof setTimeout> | null = null;

  show(
    message: string,
    type: ToastType = 'info'
  ): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.toastSignal.set({
      message,
      type
    });

    this.timeoutId = setTimeout(() => {
      this.clear();
    }, 3500);
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.toastSignal.set(null);
  }
}