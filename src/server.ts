import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
} from 'fastify-type-provider-zod';
import z, { ZodError } from 'zod/v4';
// import { userRoutes } from './controllers/users/routes';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { authRoutes } from './controllers/auth/_routes';
import { env } from './env';
import { userRoutes } from './controllers/users/_routes';
// import { JwtService } from './services/jwt-service';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: '*',
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '1h',
	},
});

// new JwtService(app);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'API test',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.get('/docs.json', async (__, _) => {
	return app.swagger();
});

app.register(import('@scalar/fastify-api-reference'), {
	routePrefix: '/swagger',
	configuration: {
		title: 'API Reference',
		url: '/docs.json',
	},
});

app.register(authRoutes, {
	prefix: '/api/auth',
});

app.register(userRoutes, {
	prefix: '/api/users',
});

app.setErrorHandler((error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.code(400).send({
			error: 'Response Validation Error',
			message: error.validation[0].message,
			issues: error.validation,
		});
	}

	if (isResponseSerializationError(error)) {
		return reply.status(500).send({
			error: 'Internal Server Error',
			message: "Response doesn't match the schema",
			issues: error.cause.issues,
		});
	}

	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: z.treeifyError(error) });
	}

	return reply.status(500).send({ message: 'Internal Server Error' });
});

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
	console.log('HTTP Server is running!');
});
