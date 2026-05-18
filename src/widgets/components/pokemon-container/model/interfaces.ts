import type { CardData } from '@shared/types/types';

export interface State {
  results: CardData[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
}
