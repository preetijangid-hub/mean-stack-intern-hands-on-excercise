import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsPage {}