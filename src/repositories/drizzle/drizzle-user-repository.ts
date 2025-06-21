import type { User, UserCreateInput } from 'src/schemas/users';
import type { UsersRepository } from '../users-repository';
import { db, type Transaction } from 'src/db';
import { users } from 'src/db/schema/users';
import { eq, or } from 'drizzle-orm';

export class DrizzleUsersRepository implements UsersRepository {
	async findByEmailOrUsername(
		email: string,
		username: string,
		tx?: Transaction,
	): Promise<User | null> {
		const dbInstance = tx ?? db;

		const [user] = await dbInstance
			.select()
			.from(users)
			.where(or(eq(users.email, email), eq(users.username, username)));

		return user;
	}

	async findByEmail(email: string, tx?: Transaction): Promise<User | null> {
		const dbInstance = tx ?? db;

		const [user] = await dbInstance
			.select()
			.from(users)
			.where(eq(users.email, email));

		return user;
	}

	async findById(id: string, tx?: Transaction): Promise<User | null> {
		const dbInstance = tx ?? db;

		const [user] = await dbInstance
			.select()
			.from(users)
			.where(eq(users.id, id));

		return user;
	}

	async create(data: UserCreateInput, tx?: Transaction): Promise<User> {
		const dbInstance = tx ?? db;

		const [user] = await dbInstance.insert(users).values(data).returning();
		return user;
	}
}
