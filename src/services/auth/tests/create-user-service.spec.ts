import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserService } from '../create-user-service';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from 'src/services/_errors/UserAlreadyExistsError';
import type { UsersRepository } from 'src/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: CreateUserService;

describe('Create user service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new CreateUserService(usersRepository);
	});

	it('should be able to create a user', async () => {
		const response = await sut.execute({
			data: {
				name: 'John Doe',
				username: 'johndoe',
				email: 'johndoe@mail.com',
				password: '12345678',
			},
		});

		expect(response).toEqual(expect.any(Object));
	});

	it('should not be able to create a user with an existing email', async () => {
		const email = 'johndoe@mail.com';

		await sut.execute({
			data: {
				name: 'John Doe',
				username: 'johndoe',
				email: email,
				password: '12345678',
			},
		});

		await expect(() =>
			sut.execute({
				data: {
					name: 'John Doe',
					username: 'johndoe',
					email: email,
					password: '12345678',
				},
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('should not be able to create a user with an existing username', async () => {
		const username = 'johndoe';

		await sut.execute({
			data: {
				name: 'John Doe',
				username: username,
				email: 'johndoe@mail.com',
				password: '12345678',
			},
		});

		await expect(() =>
			sut.execute({
				data: {
					name: 'John Doe',
					username: username,
					email: 'johndoe@mail.com',
					password: '12345678',
				},
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
