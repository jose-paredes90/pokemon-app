export interface NamedResourceContract {
  name: string;
  url: string;
}

export interface PokemonTypeContract {
  pokemon: Array<{ pokemon: NamedResourceContract }>;
}

export interface PokemonListContract {
  count: number;
  next: string | null;
  results: NamedResourceContract[];
}

export interface PokemonContract {
  id: number;
  name: string;
}
