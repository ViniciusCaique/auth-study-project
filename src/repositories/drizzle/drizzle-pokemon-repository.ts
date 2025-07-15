import type { PokemonCreateInput, Pokemon } from '@/schemas/pokemons/schema';
import type { PokemonRepository } from '../pokemon-repository';
import { db, type Transaction } from '@/db';
import { pokemons } from '@/db/schema/pokemons';

export class DrizzlePokemonRepository implements PokemonRepository {
	async create(data: PokemonCreateInput, tx: Transaction): Promise<Pokemon> {
		const dbInstace = tx ?? db;

		const [pokemon] = await dbInstace.insert(pokemons).values(data).returning();

		return pokemon;
	}
}
