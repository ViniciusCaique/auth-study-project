import type { FastifyInstance } from 'fastify';
import type { UserJwtPayload } from 'src/@types/fastify-jwt';

export class JwtService {
	constructor(private readonly fastify: FastifyInstance) {}

	async signToken(data: UserJwtPayload): Promise<string> {
		return this.fastify.jwt.sign(data);
	}

	async signRefreshToken(data: UserJwtPayload): Promise<string> {
		return this.fastify.jwt.sign(data, { expiresIn: '1d' });
	}
}
