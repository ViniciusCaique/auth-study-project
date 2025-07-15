import '@fastify/jwt';

export interface UserJwtPayload {
	id: string;
	role: string;
}

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: UserJwtPayload;
	}
}
