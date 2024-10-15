export const PokemonInitState: PokemonInitStateType = {
  count: 0,
  next: "",
  previous: "",
  result: [],
  detailedResults: [],
  displayCount: 30,
  pokemonDetails: null,
  isCaptured: false,
  captureDate: "",
  nickname: "",
};

export type PokemonInitStateType = {
  count: number;
  next: string;
  previous: string;
  result: Pokemon[];
  detailedResults: PokemonDetails[];
  displayCount: number;
  pokemonDetails: PokemonDetails | null; 
  isCaptured: boolean; 
  captureDate: string; 
  nickname: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type Sprites = {
  front_default: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: Sprites;
  weight: number;
  stats: BaseStats[];
  abilities: Ability[];
};

export type BaseStats = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Ability = {
  ability: {
    name: string;
  };
};
