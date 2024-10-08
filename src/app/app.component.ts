import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KanbanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
