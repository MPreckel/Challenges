import { useCallback, useState } from 'react';

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
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const getPokemones = useCallback(async (url?: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = url || 'https://pokeapi.co/api/v2/pokemon?limit=18&offset=0';
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      
      const data: PokemonResponse = await response.json();
      setNextUrl(data.next);
      setHasMore(data.next !== null);

      // Fetch detailed data for each Pokémon
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}`);
          }
          return await response.json();
        })
      );

      setDetailedPokemons(prev => url ? [...prev, ...detailedData] : detailedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePokemons = useCallback(() => {
    if (nextUrl && !loading && hasMore) {
      getPokemones(nextUrl);
    }
  }, [nextUrl, loading, hasMore, getPokemones]);

  return {
    detailedPokemons,
    loading,
    error,
    getPokemones,
    loadMorePokemons,
    hasMore,
  };
}