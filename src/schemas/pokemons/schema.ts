import type { pokemons } from '@/db/schema/pokemons';

export type Pokemon = typeof pokemons.$inferSelect;
export type PokemonCreateInput = typeof pokemons.$inferInsert;
export type PokemonUpdateInput = Partial<PokemonCreateInput>;
