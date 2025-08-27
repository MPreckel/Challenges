import { PokemonDetails } from "@/pokemons/useGetPokemons";

export interface Option<T extends HTMLElement = HTMLDivElement> {

  value: string | number;
  label: string;
  id?: number;
  ref?: React.RefObject<T> | React.RefCallback<T> | null;
}

export interface BaseSelectorProps {
  data: Option[];
  isLoading?: boolean;
  hasMore?: boolean;
  label?: string;
}

export interface SingleSelectorProps extends BaseSelectorProps {
  type: 'simple';
  value?: string;
  onSelect: ((value: string) => void) | undefined;
  onSearch?: ((value: string) => void) | undefined;
  selectedPokemon?: string | null;
}

export interface MultipleSelectorProps extends BaseSelectorProps {
  type: 'multiple';
  value?: string[];
  onSelect?: (value: string[]) => void;
  onSearch?: ((value: string) => void) | undefined;
  detailedPokemon?: PokemonDetails | null;
}

export type SelectorProps = SingleSelectorProps | MultipleSelectorProps;
