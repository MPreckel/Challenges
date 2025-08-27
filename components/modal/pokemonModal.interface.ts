export interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: {
    name: string;
    sprites: {
      other?: {
        showdown: {
          front_default: string;
        };
      };
    };
  } | null;
}
