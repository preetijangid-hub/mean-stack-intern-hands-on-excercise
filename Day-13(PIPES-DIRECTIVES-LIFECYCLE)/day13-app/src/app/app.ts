import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { HighlightOnHoverDirective } from './directives/highlight-on-hover';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TimeAgoPipe,
    HighlightOnHoverDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  createdDate = new Date(Date.now() - 2 * 60 * 60 * 1000);

  ngOnInit(): void {
    console.log('Component Initialized');
  }

  ngOnDestroy(): void {
    console.log('Component Destroyed');
  }
}