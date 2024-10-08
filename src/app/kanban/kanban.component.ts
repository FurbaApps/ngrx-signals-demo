import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Card } from './models/card.model';
import { Kanban } from './models/kanban.model';
import { CardsStore } from './cards.store';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  providers: [CardsStore],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  protected readonly store = inject(CardsStore);

  protected kanban: Kanban = {
    columns: [
      {
        title: 'Backlog',
        cards: [{ content: 'Karta testowa' }, { content: 'Jakaś inna karta' }],
      },
      {
        title: 'Work in progress',
        cards: [{ content: 'test' }],
      },
      {
        title: 'Done',
        cards: [],
      },
    ],
  };

  protected drop(event: CdkDragDrop<Card[]>): void {
    console.log('Drop', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  protected delete(columnIndex: number, cardIndex: number): void {
    this.kanban.columns[columnIndex].cards.splice(cardIndex, 1);
  }
}
