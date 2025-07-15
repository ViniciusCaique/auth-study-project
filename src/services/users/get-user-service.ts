import type { UserPokemonRepository } from '@/repositories/user-pokemon-repository';
import type { UsersRepository } from '@/repositories/users-repository';

interface GetUserServiceRequest {
	userId: string;
}

export class GetUserService {
	constructor(
		private usersRepository: UsersRepository,
		private userPokemonRepository: UserPokemonRepository,
	) {}

	async execute({ userId }: GetUserServiceRequest) {
		const user = await this.usersRepository.findById1(userId);

		const userPokemons =
			await this.userPokemonRepository.findAllPokemonsByUserId(userId);

		return {
			user,
			userPokemons,
		};
	}
}
