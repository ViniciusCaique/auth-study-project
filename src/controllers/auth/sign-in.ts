import type { FastifyReply, FastifyRequest } from 'fastify';
import type { signInBodyType } from 'src/schemas/users/auth';
import { InvalidCredentialsError } from 'src/services/_errors/InvalidCredentialsError';
import { makeSignInService } from 'src/services/auth/_factories/make-sign-in-servive';

export async function signIn(
	request: FastifyRequest<{
		Body: signInBodyType;
	}>,
	reply: FastifyReply,
) {
	try {
		const data = request.body;

		const service = makeSignInService();

		const response = await service.execute({ data });

		return reply.status(200).send({
			message: 'User signed in successfully',
			data: response,
		});
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(403).send({
				message: err.message,
			});
		}
		throw err;
	}
}
