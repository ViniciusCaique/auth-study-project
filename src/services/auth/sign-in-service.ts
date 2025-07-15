import bcrypt from 'bcryptjs';
import type { UsersRepository } from '@/repositories/users-repository';
import type { signInBodyType } from '@/schemas/users/auth';
import { InvalidCredentialsError } from '../_errors/InvalidCredentialsError';

interface SignInServiceRequest {
	data: signInBodyType;
}

export class SignInService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ data }: SignInServiceRequest) {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) {
			throw new InvalidCredentialsError('Invalid email or password.');
		}

		const isPasswordMatches = await bcrypt.compare(
			data.password,
			user.password,
		);
		if (!isPasswordMatches) {
			throw new InvalidCredentialsError('Invalid email or password.');
		}

		// const userPayload = {
		// 	id: user.id,
		// 	role: 'TESTE',
		// };

		// const token = await JwtService.signToken(userPayload);
		// const refreshToken = await jwtService.signRefreshToken(userPayload);

		// const token = await JwtService.signToken(userPayload);

		return {
			user: {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
			},
			// token,
			// refreshToken,
		};
	}
}
