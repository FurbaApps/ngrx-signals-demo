import { computed } from '@angular/core';
import { Kanban } from './models/kanban.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
      patchState(store, ({ columns }) => {
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
      patchState(store, ({ columns }) => {
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
      patchState(store, ({ columns }) => {
        columns[columnIndex].cards.splice(cardIndex, 1);

        return { columns };
      });
    },
  }))
);
