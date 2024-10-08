import { computed } from '@angular/core';
import { Kanban } from './models/kanban.model';
import { signalStore, withComputed, withState } from '@ngrx/signals';

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
  }))
);
