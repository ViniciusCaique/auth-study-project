import type { userPokemon } from '@/db/schema/userPokemons';

export type CreateUserPokemonInput = typeof userPokemon.$inferInsert;
