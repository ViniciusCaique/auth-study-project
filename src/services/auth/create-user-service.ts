import bcrypt from 'bcryptjs';
import type { UsersRepository } from '@/repositories/users-repository';
import type { signUpBodyType } from '@/schemas/users/auth';
import { UserAlreadyExistsError } from '../_errors/UserAlreadyExistsError';

interface CreateUserServiceRequest {
	data: signUpBodyType;
}

// interface CreateUserServiceResponse {
// 	id: string;
// }

export class CreateUserService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ data }: CreateUserServiceRequest) {
		const existingUser = await this.usersRepository.findByEmailOrUsername(
			data.email,
			data.username,
		);

		if (existingUser) {
			if (existingUser.email === data.email) {
				throw new UserAlreadyExistsError('Email is already in use.');
			} else {
				throw new UserAlreadyExistsError('Username is already in use.');
			}
		}

		data.password = await bcrypt.hash(data.password, 8);

		const user = await this.usersRepository.create(data);

		return {
			user: {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
			},
		};
	}
}
