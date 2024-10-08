import { Card } from './card.model';

export interface Kanban {
  columns: {
    title: string;
    cards: Card[];
  }[];
}
