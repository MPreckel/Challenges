import { FC } from 'react';
import { CardProps } from './card.interface';
import { SCImageWrapper, SCText } from './card.styles';

export const Card: FC<CardProps> = ({ imageUrl, pokemonName }) => {
  return (
    <SCImageWrapper>
      {imageUrl ? (
      <img 
        src={imageUrl} 
        alt={pokemonName}
        width={200}
        height={200} 
      />
      ) : (
        <SCText>
          Selecciona un pokemon
        </SCText>
      )}
    </SCImageWrapper>
  );
}