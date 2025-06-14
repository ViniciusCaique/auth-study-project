import { createUser } from "./create-user";
import { userCreateBody } from "src/schemas/users";
import z from "zod/v4";
import type { FastifyTypedInstance } from "src/schemas/fastify-instance";

export async function userRoutes(app: FastifyTypedInstance) {
	app.post(
		"/register",
		{
			schema: {
				tags: ["users"],
				description: "Create a new user",
				body: userCreateBody,
				response: {
					201: z.object({
						data: z.object({
							name: z.string(),
							email: z.string(),
						}),
					}),
				},
			},
		},
		createUser,
	);
}
