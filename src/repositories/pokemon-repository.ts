import type { Pokemon, PokemonCreateInput } from '@/schemas/pokemons/schema';
import type { ITransaction } from './transaction-repository';

export interface PokemonRepository {
	create(data: PokemonCreateInput, tx?: ITransaction): Promise<Pokemon>;
}
