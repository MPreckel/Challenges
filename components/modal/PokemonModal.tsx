import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  PokemonImage,
  SCImageWrapper,
  SCPokemonName,
  StatsContainer,
  StatsTitle,
  StatsGroup,
  StatGroup,
  StatName,
  ProgressBarContainer,
  ProgressBar,
  CounterStat,
} from './pokemonModal.styles';
import { PokemonModalProps } from './pokemonModal.interface';

const getStatWidth = (baseStat: number, maxStatValue: number): number => {
  return (baseStat / maxStatValue) * 100;
};

const PokemonModal: React.FC<PokemonModalProps> = ({
  isOpen,
  onClose,
  pokemon,
}) => {
  if (!isOpen || !pokemon) {
    return null;
  }
  const imageUrl = pokemon.sprites?.other?.showdown.front_default;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {imageUrl && (
          <SCImageWrapper>
            <PokemonImage src={imageUrl} alt={pokemon.name} />
          </SCImageWrapper>
        )}
        <SCPokemonName>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </SCPokemonName>

        {/* Sección de estadísticas */}
        <StatsContainer>
          <StatsTitle>Stats</StatsTitle>
          <StatsGroup>
            {pokemon.stats.map((stat, index) => {
              const maxStatValue = stat.stat.name === 'hp' ? 160 : 180;
              const width = getStatWidth(stat.base_stat, maxStatValue);
              return (
                <StatGroup key={index}>
                  <StatName>
                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
                  </StatName>
                  <ProgressBarContainer>
                    <ProgressBar style={{ width: `${width}%` }} />
                  </ProgressBarContainer>
                  <CounterStat>{stat.base_stat}</CounterStat>
                </StatGroup>
              );
            })}
          </StatsGroup>
        </StatsContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PokemonModal;