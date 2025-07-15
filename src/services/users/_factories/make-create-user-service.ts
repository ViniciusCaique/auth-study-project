import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-user-repository';
import { GetUserService } from '../get-user-service';
import { DrizzleUserPokemonRepository } from '@/repositories/drizzle/drizzle-user-pokemon-repository';

export function makeGetUserService() {
	const usersRepository = new DrizzleUsersRepository();
	const userPokemonRepository = new DrizzleUserPokemonRepository();

	const getUserService = new GetUserService(
		usersRepository,
		userPokemonRepository,
	);

	return getUserService;
}
