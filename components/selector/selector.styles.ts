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

export const SCSelectorOption = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 180px;

  &:hover {
    background-color: #f5f5f5;
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
  position: absolute;
  display: flex;
  top: 60px;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px;
  background: white;
  max-height: 200px;
  overflow-y: auto;
  min-height: 40px;
  z-index: 999;
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