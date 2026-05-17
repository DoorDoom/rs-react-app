import type { PokemonCardData } from '@shared/types/types';
import type { PokemonResult } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT = '18';

export async function searchPokemons(
  offset: number = 1
): Promise<PokemonCardData[]> {
  const url =
    BASE_URL + `?limit=${LIMIT}&offset=${(offset - 1) * Number(LIMIT)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const pokemonsData: PokemonResult = await response.json();

  if (pokemonsData.count === 0) {
    return [];
  }

  const responses = await Promise.all(
    pokemonsData.results?.map(async (pokemon) => {
      return await findPokemon(pokemon.name);
    }) || []
  );

  return responses;
}

export async function findPokemon(query: string): Promise<PokemonCardData> {
  const url = BASE_URL + '/' + query;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data: PokemonCardData = await response.json();

  return data;
}
