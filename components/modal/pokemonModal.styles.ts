import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  height: 650px;
  gap: 20px;
  width: 100%;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
export const SCImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;
export const SCPokemonName = styled.h2`
  text-align: center;
`;
export const StatsContainer = styled.div`
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

export const StatsTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

export const StatsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StatGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const StatName = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  min-width: 120px;
  color: #555;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  border-radius: 5px;
  transition: width 0.3s ease;
`;

export const CounterStat = styled.span`
  font-weight: 700;
  font-size: 16px;
  text-align: right;
  color: #333;
`;
