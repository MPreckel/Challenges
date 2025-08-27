import { PokemonDetails } from '@/pokemons/useGetPokemons';

export interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDetails | null;
}
