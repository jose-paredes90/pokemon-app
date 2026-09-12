export interface PokemonType {
  name: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
  stats: PokemonStat[];
  heightInDecimeters: number;
  weightInHectograms: number;
  abilities: string[];
}
