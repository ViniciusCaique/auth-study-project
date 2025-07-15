import type { users } from 'src/db/schema/users';
import z from 'zod/v4';
import { Pokemon } from '../pokemons/schema';

export type User = typeof users.$inferSelect;
export type UserCreateInput = typeof users.$inferInsert;
export type UserUpdateInput = Partial<UserCreateInput>;

export type UserPreview = Pick<User, 'name' | 'email' | 'username'>;

export const getUserParams = z.object({
	userId: z.string(),
});

export type getUserParams = z.infer<typeof getUserParams>;

export type UserWithPokemon = {
	userId: string;
	pokemons: Pokemon | null;
};
