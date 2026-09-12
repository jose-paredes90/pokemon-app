export interface PokemonDetailContract {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string } }>;
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: { other?: { 'official-artwork'?: { front_default: string | null } } };
}
