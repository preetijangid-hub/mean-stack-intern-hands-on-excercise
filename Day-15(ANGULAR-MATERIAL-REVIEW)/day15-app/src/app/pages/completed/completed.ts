import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './completed.html',
  styleUrl: './completed.css'
})
export class CompletedPage {}