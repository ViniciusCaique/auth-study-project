import z from "zod/v4";

export const userCreateBody = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
});
