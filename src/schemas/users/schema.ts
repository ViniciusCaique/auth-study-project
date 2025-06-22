import type { users } from 'src/db/schema/users';

export type User = typeof users.$inferSelect;
export type UserCreateInput = typeof users.$inferInsert;
