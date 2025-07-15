import type { CreateUserPokemonInput } from '@/schemas/user-pokemon/schema';
import type { UserPokemonRepository } from '../user-pokemon-repository';
import { db, type Transaction } from '@/db';
import { userPokemon } from '@/db/schema/userPokemons';
import type { UserWithPokemon } from '@/schemas/users/schema';
import { pokemons } from '@/db/schema/pokemons';
import { eq } from 'drizzle-orm';

export class DrizzleUserPokemonRepository implements UserPokemonRepository {
	async create(data: CreateUserPokemonInput, tx: Transaction): Promise<void> {
		const dbInstance = tx ?? db;

		await dbInstance.insert(userPokemon).values(data);
	}

	async findAllPokemonsByUserId(
		id: string,
		tx?: Transaction,
	): Promise<UserWithPokemon | null> {
		const dbInstance = tx ?? db;

		const [result] = await dbInstance
			.select({
				userId: userPokemon.userId,
				pokemons,
			})
			.from(userPokemon)
			.leftJoin(pokemons, eq(userPokemon.pokemonId, pokemons.id))
			.where(eq(userPokemon.userId, id));

		return result;
	}
}
