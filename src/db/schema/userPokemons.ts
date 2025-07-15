import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { pokemons } from './pokemons';

export const userPokemon = pgTable(
	'tb_user_pokemon',
	{
		userId: uuid('userId')
			.notNull()
			.references(() => users.id, {
				onDelete: 'cascade',
			}),
		pokemonId: uuid('pokemonId')
			.notNull()
			.references(() => pokemons.id, {
				onDelete: 'cascade',
			}),
		createdAt: timestamp().notNull().defaultNow(),
		updatedAt: timestamp().notNull().defaultNow(),
	},
	(t) => [primaryKey({ columns: [t.userId, t.pokemonId] })],
);
