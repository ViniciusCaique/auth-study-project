import type { User, UserCreateInput } from 'src/schemas/users';
import type { ITransaction } from './transaction-repository';

export interface UsersRepository {
	findByEmail(email: string, tx?: ITransaction): Promise<User | null>;
	findByEmailOrUsername(
		email: string,
		username: string,
		tx?: ITransaction,
	): Promise<User | null>;
	findById(id: string, tx?: ITransaction): Promise<User | null>;
	create(data: UserCreateInput, tx?: ITransaction): Promise<User>;
}
