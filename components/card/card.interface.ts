export interface CardProps {
  imageUrl: string | null;
  pokemonName: string | null;
  onImageClick?: () => void;
}