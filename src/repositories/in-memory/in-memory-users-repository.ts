import { randomUUID } from 'node:crypto';
import type { User, UserCreateInput } from 'src/schemas/users/schema';
import type { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmailOrUsername(
		email: string,
		username: string,
	): Promise<User | null> {
		const user = this.users.find(
			(user) => user.email === email || user.username === username,
		);

		if (!user) {
			return null;
		}

		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name: data.name,
			username: data.username,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.users.push(user);

		return user;
	}
}
