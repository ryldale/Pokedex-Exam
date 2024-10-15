export type CapturedPokemon = {
  name: string;
  date: string;
  nickname: string;
  url: string;
  weight: number;
  stats: BaseStats[];
  abilities: Ability[];
  sprite: string;
};

export type BaseStats = {
  base_stat: number;
  name: string;
};

export type Ability = {
  name: string;
};
