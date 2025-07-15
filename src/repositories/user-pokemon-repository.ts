import type { CreateUserPokemonInput } from '@/schemas/user-pokemon/schema';
import type { ITransaction } from './transaction-repository';
import type { UserWithPokemon } from '@/schemas/users/schema';

export interface UserPokemonRepository {
	findAllPokemonsByUserId(
		id: string,
		tx?: ITransaction,
	): Promise<UserWithPokemon | null>;
	create(data: CreateUserPokemonInput, tx?: ITransaction): Promise<void>;
}
