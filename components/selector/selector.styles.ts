import styled from "styled-components";

export const SCSelectorContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const SCSearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  font-family: inherit;
  line-height: 1.5;
`;
export const SCSelectorAndButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const SCSelectorWrapper = styled.button<{ $isOpen: boolean}>`
  padding: 12px;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font: inherit;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  ${props => props.$isOpen && `
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  `}
`;

export const SCSelectorOptions = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100000000;  
  max-height: 200px;
  overflow-y: auto;
`;

export const SCSelectorOption = styled.div<{ $isSelected?: boolean }>`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  min-width: 180px;
  background-color: ${props => props.$isSelected ? '#f0f7ff' : 'transparent'};
  color: ${props => props.$isSelected ? '#0066cc' : 'inherit'};
  font-weight: ${props => props.$isSelected ? '600' : 'normal'};

  &:hover {
    background-color: ${props => props.$isSelected ? '#e0f0ff' : '#f5f5f5'};
  }
`;

export const SCArrowButton = styled.div<{ $isCollapsed: boolean }>`
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: rotate(
    ${({ $isCollapsed }) => ($isCollapsed ? '180deg' : '0deg')}
  );
`;

export const SCChipsWrapper = styled.div`
 width: 250px;
  height: 300px;
  position: absolute;
  top: 60px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: transparent;
  overflow-y: auto;
  z-index: 999;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 8px;
  align-content: flex-start;
`;
export const SCSearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SCSearchButton = styled.button`
  height: 40px;
  padding: 0 20px;
  color: white;
  border: none;
  background-color: blue;
  cursor: pointer;
  border-radius: 30px;
`;