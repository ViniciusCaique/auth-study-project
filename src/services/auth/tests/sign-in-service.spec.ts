import bcrypt from 'bcryptjs';
import { SignInService } from '../sign-in-service';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { InvalidCredentialsError } from 'src/services/_errors/InvalidCredentialsError';
import type { UsersRepository } from 'src/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: SignInService;

describe('Sign in service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new SignInService(usersRepository);
	});

	it('should be able to sign in a user', async () => {
		await usersRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@mail.com',
			password: await bcrypt.hash('12345678', 8),
		});

		const response = await sut.execute({
			data: {
				email: 'johndoe@mail.com',
				password: '12345678',
			},
		});

		expect(response).toEqual(
			expect.objectContaining({
				user: {
					id: expect.any(String),
					name: 'John Doe',
					username: 'johndoe',
					email: 'johndoe@mail.com',
				},
			}),
		);
	});

	it('should not be able to sign in with wrong email', async () => {
		await expect(async () => {
			await sut.execute({
				data: {
					email: 'johndoe@mail.com',
					password: '12345678',
				},
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not be able to sign in with wrong password', async () => {
		await usersRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@mail.com',
			password: '12345678',
		});

		await expect(async () => {
			await sut.execute({
				data: {
					email: 'johndoe@mail.com',
					password: 'wrong-password',
				},
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
