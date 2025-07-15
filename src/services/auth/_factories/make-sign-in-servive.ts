import { DrizzleUsersRepository } from 'src/repositories/drizzle/drizzle-user-repository';
import { SignInService } from '../sign-in-service';

export function makeSignInService() {
	const usersRepository = new DrizzleUsersRepository();

	const signInService = new SignInService(usersRepository);

	return signInService;
}
