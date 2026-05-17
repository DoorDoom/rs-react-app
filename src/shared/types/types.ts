export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonCardData {
  name: string;
  types: PokemonTypes[];
  sprites: {
    front_default: string;
  };
}

export type ResultResponse = {
  name: string;
  url: string;
};
