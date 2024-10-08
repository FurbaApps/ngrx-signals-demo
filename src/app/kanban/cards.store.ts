import { Kanban } from './models/kanban.model';
import { signalStore, withState } from '@ngrx/signals';

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

export const CardsStore = signalStore(withState(initialState));
