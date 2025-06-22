import type { FastifyReply, FastifyRequest } from 'fastify';
import type { signUpBodyType } from 'src/schemas/users/auth';
import { UserAlreadyExistsError } from 'src/services/_errors/UserAlreadyExistsError';
import { makeCreateUserService } from 'src/services/auth/_factories/make-create-user-service';

export async function createUser(
	request: FastifyRequest<{
		Body: signUpBodyType;
	}>,
	reply: FastifyReply,
) {
	try {
		const data = request.body;

		const service = makeCreateUserService();
		const response = await service.execute({ data });

		return reply.status(201).send({
			message: 'User created successfully',
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
