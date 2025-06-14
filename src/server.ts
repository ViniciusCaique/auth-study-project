import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z, { ZodError } from "zod/v4";
import { userRoutes } from "./controllers/users/routes";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "API test",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(userRoutes, {
	prefix: "/users",
});

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: z.treeifyError(error) });
	}

	console.error(error);

	return reply.status(500).send({ message: "Internal Server Error" });
});

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
	console.log("HTTP Server is running!");
});
