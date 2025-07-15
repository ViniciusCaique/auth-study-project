import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const element = {
	FIRE: 'Fire',
	WATER: 'Water',
	GRASS: 'Grass',
	DRAGON: 'Dragon',
	DARK: 'Dark',
	FAIRY: 'Fairy',
	ELETRIC: 'Eletric',
	METAL: 'Metal',
	NORMAL: 'Normal',
	GROUND: 'Ground',
} as const;

export type ElementTypes = typeof element;

export const elementsEnum = pgEnum('element', [
	'Fire',
	'Water',
	'Grass',
	'Dragon',
	'Dark',
	'Fairy',
	'Eletric',
	'Metal',
	'Normal',
	'Ground',
]);

export const pokemons = pgTable('tb_pokemons', {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	element: elementsEnum('element').notNull(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});
