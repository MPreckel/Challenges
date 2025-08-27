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
  top: 192px;
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
  left: ${props => props.$singleType ? '386px' : '340px'};
  gap: 8px;
`;

export const SCType = styled.div<{ type: PokemonType }>`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  min-width: 80px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ type }) => typeColors[type] || '#777'};
  border: 1px solid ${({ type }) => typeColors[type] ? `${typeColors[type]}99` : '#999'};
`;

export const SCButton = styled.button`
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
  
