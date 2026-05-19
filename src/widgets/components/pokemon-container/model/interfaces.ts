import type { PokemonCardData } from '@shared/types/types';

export interface State {
  results: PokemonCardData[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
}

export type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
