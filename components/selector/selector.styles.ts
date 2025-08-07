import styled from "styled-components";

export const SCSelectorContainer = styled.div`
  width: 100%;
`;

export const SCSelectorButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  ${props => props.isOpen && `
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  `}
`;

export const SCSelectorOptions = styled.ul<{ isOpen: boolean }>`
  width: 100%;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

export const SCSelectorOption = styled.li<{ isSelected?: boolean }>`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
  }

  ${props => props.isSelected && `
    background-color: #0070f3;
    color: white;
  `}
`;

export const SCArrowButton = styled.button<{ $isCollapsed: boolean }>`
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: rotate(
    ${({ $isCollapsed }) => ($isCollapsed ? '180deg' : '0deg')}
  );
`;
