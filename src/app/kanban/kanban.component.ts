import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';
import { CardsStore } from './cards.store';
import { Kanban } from './models/kanban.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  providers: [CardsStore],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  private readonly dialog = inject(MatDialog);
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

  protected drop(event: CdkDragDrop<{ columnIndex: number }>): void {
    if (event.previousContainer === event.container) {
      this.store.moveCardInColumn(
        event.container.data.columnIndex,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.store.moveCardBetweenColumns(
        event.previousContainer.data.columnIndex,
        event.container.data.columnIndex,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  protected delete(columnIndex: number, cardIndex: number): void {
    this.store.deleteCard(columnIndex, cardIndex);
  }

  protected add(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.store.columns(),
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (data) => data && this.store.addCard(data.columnIndex, data.content)
      );
  }
}
