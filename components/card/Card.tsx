import { FC } from 'react';
import { CardProps } from './card.interface';

export const Card: FC<CardProps> = ({ imageUrl }) => {
  return (
    <div>
      <img 
        src={imageUrl} 
        alt="Card image" 
      />
    </div>
  );
}