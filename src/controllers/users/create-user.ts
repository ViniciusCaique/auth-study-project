import type { FastifyReply, FastifyRequest } from "fastify";
import { userCreateBody } from "src/schemas/users";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const data = userCreateBody.parse(request.body);

		return reply.status(201).send({
			data: data,
		});
	} catch (err) {
		console.error(err);
		throw err;
	}
}
