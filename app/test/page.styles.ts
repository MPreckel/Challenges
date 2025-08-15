import { PokemonType, typeColors } from "@/pokemons/pokemonTypes";
import styled from "styled-components";

export const SCMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SCSelectorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SCSelector = styled.div`
  max-width: 200px;
`;

export const SCCardWrapper = styled.div`
  position: absolute;
  top: 198px;
  left: 424px;
  transform: translate(-50%, -50%);
  padding: 16px;
`;

export const SCCardAndImageWrapper = styled.div`
  position: relative;
`;

interface SCTypesWrapperProps {
  $singleType?: boolean;
}

export const SCTypesWrapper = styled.div<SCTypesWrapperProps>`
  display: flex;
  position: absolute;
  top: 504px;
  left: ${props => props.$singleType ? '386px' : '330px'};
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
`;

export const SCType = styled.div<{ type: PokemonType }>`
  display: flex;
  padding: 6px;
  border-radius: 50px;
  height: 24px;
  min-width: 80px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ type }) => typeColors[type] || '#777'};
  border: 1px solid ${({ type }) => typeColors[type] ? `${typeColors[type]}99` : '#999'};
`;
