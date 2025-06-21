import { DrizzleUsersRepository } from 'src/repositories/drizzle/drizzle-user-repository';
import { CreateUserService } from '../create-user-service';

export function makeCreateUserService() {
	const usersRepository = new DrizzleUsersRepository();

	const createUserService = new CreateUserService(usersRepository);

	return createUserService;
}
