import type { PokemonCardData } from '@shared/types/types';
import { findPokemon, searchPokemons } from '../api/pokemon-api-service';

export async function fetchPokemons(query: string, page: number) {
  let data: PokemonCardData[] = [];
  if (!query || query.trim() === '') {
    data = await searchPokemons(page);
  } else {
    const pokemon = await findPokemon(query);
    data = [pokemon];
  }

  return {
    results: data,
    error: data.length === 0 ? 'No results found' : null,
  };
}
