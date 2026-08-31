import {
  Pipe,
  PipeTransform
} from '@angular/core';

/* Formats task status values as human-friendly labels:
   'pending' -> 'Not Started'
   'in-progress' -> 'In Progress'
   'completed' -> 'Completed'
   (also handles legacy boolean values for safety) */
@Pipe({
  name: 'taskStatus',
  standalone: true
})
export class TaskStatusPipe
  implements PipeTransform {

  transform(
    value:
      | string
      | boolean
      | undefined
      | null
  ): string {
    if (value === true) {
      return 'Completed';
    }

    if (
      value === false ||
      value === null ||
      value === undefined
    ) {
      return 'Not Started';
    }

    switch (value) {
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
}