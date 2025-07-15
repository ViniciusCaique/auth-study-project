import type { getUserParams } from '@/schemas/users/schema';
import { makeGetUserService } from '@/services/users/_factories/make-create-user-service';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { UserAlreadyExistsError } from 'src/services/_errors/UserAlreadyExistsError';

export async function getUser(
	request: FastifyRequest<{
		Params: getUserParams;
	}>,
	reply: FastifyReply,
) {
	try {
		const user = request.params;

		const service = makeGetUserService();

		const response = await service.execute({ userId: user.userId });

		return reply.status(201).send({
			message: 'User',
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
