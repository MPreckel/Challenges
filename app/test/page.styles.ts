import { PokemonType, typeColors } from "@/pokemons/pokemonTypes";
import styled from "styled-components";

export const SCBannerRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  background-color: #F8F8F8;
`;

export const SCSelectorsWrapper = styled.div`
  display: flex;
  gap: 20rem;
  background-color: #F8F8F8;
`;

export const SCCardWrapper = styled.div`
  position: absolute;
  width: fit-content;
  top: 92px;
  left: 630px;
  z-index: 2;
`;

export const SCCardAndImageWrapper = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8;
`;
export const SCImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SCTypesWrapper = styled.div<{ $singleType?: boolean }>`
  display: flex;
  position: absolute;
  bottom: 148px;
  left: ${({ $singleType }) => ($singleType ? "680px" : "635px")};
  width: fit-content;
  gap: 8px;
  z-index: 3;
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
  background-color: ${({ type }) => typeColors[type] || "#777"};
  border: 1px solid
    ${({ type }) => (typeColors[type] ? `${typeColors[type]}99` : "#999")};
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

export const SCUserNameAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
