import type { FastifyReply, FastifyRequest } from 'fastify';
import { userCreateBody } from 'src/schemas/users';
import { UserAlreadyExistsError } from 'src/services/_errors/UserAlreadyExistsError';
import { makeCreateUserService } from 'src/services/auth/_factories/make-create-user-service';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const data = userCreateBody.parse(request.body);

		const service = makeCreateUserService();
		const response = await service.execute({ data });

		return reply.status(201).send({
			data: response,
		});
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return reply.status(403).send({
				message: err.message,
			});
		}

		throw err;
	}
}
