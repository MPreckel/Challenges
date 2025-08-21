import { useCallback, useState } from "react";

interface PokemonBasicInfo {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasicInfo[];
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
  const [pokemonList, setPokemonList] = useState<PokemonBasicInfo[]>([]);
  const [detailedPokemon, setDetailedPokemon] = useState<PokemonDetails | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const url_default = 'https://pokeapi.co/api/v2/pokemon?limit=18&offset=0';

  const fetchFunction = (url: string) => {
    const response = fetch(url);
    return response;
  };
  const getPokemons = useCallback(async (url?: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = url || url_default;
      const response = await fetchFunction(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon data');
      }
      
      const data: PokemonResponse = await response.json();
      setNextUrl(data.next);
      setHasMore(data.next !== null);

      setPokemonList(prev => url ? [...prev, ...data.results] : data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper compartido para obtener detalles por nombre/id o por URL directa
  const fetchPokemonDetails = useCallback(async (identifierOrUrl: string, isUrl: boolean = false): Promise<PokemonDetails> => {
    const targetUrl = isUrl
      ? identifierOrUrl
      : `${baseUrl}${identifierOrUrl.toLowerCase()}`;
    const response = await fetchFunction(targetUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data');
    }
    const data: PokemonDetails = await response.json();
    return data;
  }, []);

  const getPokemonDetails = useCallback(async (pokemonName: string) => {
    try {
      setLoading(true);
      setError(null);
      // Si existe en la lista, usamos su URL; si no, consultamos por nombre directamente
      const pokemon = pokemonList.find(p => p.name === pokemonName);
      const data = await fetchPokemonDetails(pokemon ? pokemon.url : pokemonName, !!pokemon);
      setDetailedPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [pokemonList, fetchPokemonDetails]);

  const loadMorePokemons = useCallback(() => {
    if (nextUrl && !loading && hasMore) {
      getPokemons(nextUrl);
    }
  }, [nextUrl, loading, hasMore, getPokemons]);

  const searchPokemon = async (searchValue: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDetails(searchValue);
      setDetailedPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDetailedPokemon(null);
    } finally {
      setLoading(false);
    }
  };
  return {
    pokemonList,
    detailedPokemon,
    loading,
    error,
    getPokemons,
    getPokemonDetails,
    loadMorePokemons,
    hasMore,
    searchPokemon,
  };
}