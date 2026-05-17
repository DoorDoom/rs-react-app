export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResult {
  results?: Pokemon[];
  count?: number;
}
