import { createUser } from '../auth/create-user';
import { userCreateBody } from 'src/schemas/users';
import type { FastifyTypedInstance } from 'src/schemas/fastify-instance';
import z from 'zod/v4';

export async function authRoutes(app: FastifyTypedInstance) {
	app.post(
		'/sign-up',
		{
			schema: {
				tags: ['users'],
				description: 'Create a new user',
				body: userCreateBody,
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
}
