import { drizzle } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { env } from 'src/env';
import { users } from './schema/users';
import type { ExtractTablesWithRelations } from 'drizzle-orm';

export const db = drizzle(env.DATABASE_URL, {
	schema: {
		users,
	},
});

type Schema = {
	users: typeof users;
};

export type Transaction = PgTransaction<
	PostgresJsQueryResultHKT,
	Schema,
	ExtractTablesWithRelations<Schema>
>;
