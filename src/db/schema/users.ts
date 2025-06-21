import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('tb_users', {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).notNull().unique(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});
