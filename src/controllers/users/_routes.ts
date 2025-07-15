import type { FastifyTypedInstance } from 'src/schemas/fastify-instance';
import z from 'zod/v4';
import { getUser } from './get-user';
import { getUserParams } from '@/schemas/users/schema';

export async function userRoutes(app: FastifyTypedInstance) {
	app.get(
		'/:userId',
		{
			schema: {
				tags: ['Users'],
				description: 'Get an user',
				params: getUserParams,
				response: {
					200: z.object({
						data: z.object({
							user: z.object({
								name: z.string(),
								username: z.string(),
								email: z.string(),
							}),
							userPokemons: z.object({
								userId: z.string(),
								pokemons: z.object({
									id: z.string(),
									name: z.string(),
									element: z.string(),
								}),
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
		getUser,
	);
}
