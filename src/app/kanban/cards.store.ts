import { computed } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Kanban } from './models/kanban.model';

const initialState: Kanban = {
  columns: [
    {
      title: 'Backlog',
      cards: [{ content: 'Karta testowa' }, { content: 'Jakaś inna karta' }],
    },
    {
      title: 'Work in progress',
      cards: [{ content: 'Kolejna karta' }],
    },
    {
      title: 'Done',
      cards: [],
    },
  ],
};

export const CardsStore = signalStore(
  withDevtools('kanban'),
  withState(initialState),
  withComputed(({ columns }) => ({
    cardsCount: computed(() =>
      columns().reduce((total, column) => total + column.cards.length, 0)
    ),
    countByColumn: computed(() =>
      columns().map((column) => column.cards.length)
    ),
  })),
  withMethods((store) => ({
    moveCardInColumn(
      columnIndex: number,
      fromIndex: number,
      toIndex: number
    ): void {
      // wrapper around patchState with action name added
      updateState(store, 'Move card in column', ({ columns }) => {
        moveItemInArray(columns[columnIndex].cards, fromIndex, toIndex);
        return { columns };
      });
    },
    moveCardBetweenColumns(
      previousColumnIndex: number,
      currentColumnIndex: number,
      fromIndex: number,
      toIndex: number
    ): void {
      updateState(store, 'Move card between columns', ({ columns }) => {
        transferArrayItem(
          columns[previousColumnIndex].cards,
          columns[currentColumnIndex].cards,
          fromIndex,
          toIndex
        );
        return { columns };
      });
    },
    deleteCard(columnIndex: number, cardIndex: number): void {
      updateState(store, 'Delete card', ({ columns }) => {
        columns[columnIndex].cards.splice(cardIndex, 1);

        return { columns };
      });
    },
  }))
);
