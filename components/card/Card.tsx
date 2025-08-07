import { FC } from 'react';
import { CardProps } from './card.interface';
import { SCImageWrapper } from './card.styles';

export const Card: FC<CardProps> = ({ imageUrl, pokemonName }) => {
  return (
    <SCImageWrapper>
      <img 
        src={imageUrl} 
        alt={pokemonName}
        width={200}
        height={200} 
      />
    </SCImageWrapper>
  );
}