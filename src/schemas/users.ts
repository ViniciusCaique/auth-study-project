import type { users } from 'src/db/schema/users';
import z from 'zod/v4';

export const userCreateBody = z.object({
	name: z.string(),
	username: z.string().regex(/^[\w]+$/, {
		message: 'Username can only contain letters, numbers, and underscores.',
	}),
	email: z.email(),
	password: z.string(),
});

export type userCreateBodyType = z.infer<typeof userCreateBody>;

export type User = typeof users.$inferSelect;
export type UserCreateInput = typeof users.$inferInsert;
