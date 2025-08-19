import { FC } from 'react';
import { CardProps } from './card.interface';
import { SCImageWrapper, SCText } from './card.styles';
import { labels, messages } from '@/messages/messages';

export const Card: FC<CardProps> = ({ imageUrl, pokemonName }) => {
  return (
    <SCImageWrapper>
      {imageUrl ? (
      <img 
        src={imageUrl} 
        alt={pokemonName ?? labels.pokemon}
        width={200}
        height={200} 
      />
      ) : (
        <SCText>
          {messages.selectPokemon}
        </SCText>
      )}
    </SCImageWrapper>
  );
}