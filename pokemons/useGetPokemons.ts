import { useState } from 'react';

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export function useGetPokemons() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedPokemons, setDetailedPokemons] = useState<PokemonDetails[]>([]);

  const getPokemones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=18&offset=0');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      const data = await response.json();
      console.log(data)
      // Fetch detailed data for each Pokémon
      const detailedData = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}`);
          }
          return await response.json();
        })
      );

      setDetailedPokemons(detailedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    detailedPokemons,
    loading,
    error,
    getPokemones,
  };
}