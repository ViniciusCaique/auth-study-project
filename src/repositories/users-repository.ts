import type {
	User,
	UserCreateInput,
	UserPreview,
} from 'src/schemas/users/schema';
import type { ITransaction } from './transaction-repository';

export interface UsersRepository {
	findByEmail(email: string, tx?: ITransaction): Promise<User | null>;
	findByEmailOrUsername(
		email: string,
		username: string,
		tx?: ITransaction,
	): Promise<User | null>;
	findById(id: string, tx?: ITransaction): Promise<User | null>;
	findById1(id: string, tx?: ITransaction): Promise<UserPreview | null>;
	create(data: UserCreateInput, tx?: ITransaction): Promise<User>;
}
