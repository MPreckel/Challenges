import styled from 'styled-components';
import { StyledChipProps } from './chip.interface';



export const StyledChip = styled.div<StyledChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-family: ${({ theme }) => theme?.typography?.fontFamily || 'sans-serif'};
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  cursor: default;
  user-select: none;
  
  ${({ $size = 'medium' }) => {
    switch ($size) {
      case 'small':
        return `
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          height: 24px;
        `;
      case 'large':
        return `
          padding: 0.5rem 1rem;
          font-size: 1rem;
          height: 40px;
        `;
      case 'medium':
      default:
        return `
          padding: 0.375rem 0.875rem;
          font-size: 0.875rem;
          height: 32px;
        `;
    }
  }}

  ${({ theme, $variant = 'filled', $color = 'primary' }) => {
    const defaultColor = {
      main: '#1976d2',
      dark: '#1565c0',
      light: '#42a5f5',
      contrastText: '#fff'
    };
    
    const color = theme?.palette?.[$color] || defaultColor;
    
    if ($variant === 'outlined') {
      return `
        color: ${color.main};
        background-color: transparent;
        border: 1px solid ${color.main};
        
        &:hover {
          background-color: ${color.light}15;
        }
      `;
    }
    
    return `
      color: ${color.contrastText || '#fff'};
      background-color: ${color.main};
      border: 1px solid transparent;
      
      &:hover {
        background-color: ${color.dark};
      }
    `;
  }}
`;

export const ChipIcon = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
  
  svg {
    width: 1em;
    height: 1em;
    font-size: 1.25em;
  }
`;

export const ChipDelete = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  margin-right: -0.25rem;
  padding: 0.25rem;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  color: inherit;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: 1em;
    height: 1em;
    font-size: 1.25em;
  }
`;