import { createUser } from './create-user';
import { signUpBody } from 'src/schemas/users/auth';
import type { FastifyTypedInstance } from 'src/schemas/fastify-instance';
import z from 'zod/v4';
import { signIn } from './sign-in';

export async function authRoutes(app: FastifyTypedInstance) {
	app.post(
		'/sign-up',
		{
			schema: {
				tags: ['auth'],
				description: 'Create a new user',
				body: signUpBody,
				response: {
					201: z.object({
						data: z.object({
							user: z.object({
								id: z.string(),
								name: z.string(),
								username: z.string(),
								email: z.string(),
							}),
						}),
					}),
					400: z.object({
						// message: z.string(),
						// issues: z.object({
						// 	errors: z.array(z.any()),
						// 	properties: z.record(
						// 		z.string(),
						// 		z.object({
						// 			errors: z.array(z.string()),
						// 		}),
						// 	),
						// }),

						error: z.string(),
						message: z.string(),
						issues: z.any(),
					}),
					403: z.object({
						message: z.string(),
					}),
				},
			},
		},
		createUser,
	);
	app.post(
		'/sign-in',
		{
			schema: {
				tags: ['auth'],
				description: 'Sign in an existing user',
				body: z.object({
					email: z.email(),
					password: z.string().min(8, {
						message: 'Password must be at least 8 characters long.',
					}),
				}),
				response: {
					200: z.object({
						data: z.object({
							// token: z.string(),
							user: z.object({
								id: z.string(),
								name: z.string(),
								username: z.string(),
								email: z.string(),
							}),
						}),
					}),
					400: z.object({
						error: z.string(),
						message: z.string(),
						issues: z.any(),
					}),
					403: z.object({
						message: z.string(),
					}),
				},
			},
		},
		signIn,
	);
}
