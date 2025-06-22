import z from 'zod/v4';

export const signUpBody = z.object({
	name: z.string(),
	username: z.string().regex(/^[\w]+$/, {
		message: 'Username can only contain letters, numbers, and underscores.',
	}),
	email: z.email(),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long.' }),
});

export type signUpBodyType = z.infer<typeof signUpBody>;

export const signInBody = z.object({
	email: z.email(),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters long.',
	}),
});

export type signInBodyType = z.infer<typeof signInBody>;
