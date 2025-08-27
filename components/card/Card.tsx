import { FC } from 'react';
import { CardProps } from './card.interface';
import { SCImageWrapper, SCText } from './card.styles';
import { labels, messages } from '@/messages/messages';

export const Card: FC<CardProps> = ({ imageUrl, pokemonName, onImageClick }) => {
  return (
    <SCImageWrapper>
      {imageUrl ? (
      <img 
        src={imageUrl} 
        alt={pokemonName ?? labels.pokemon}
        width={165}
        height={165} 
        onClick={onImageClick}
      />
      ) : (
        <SCText>
          {messages.selectPokemon}
        </SCText>
      )}
    </SCImageWrapper>
  );
}