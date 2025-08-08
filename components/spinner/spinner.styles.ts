import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SCSpinner = styled.div<{ $spinnerColor: string; size: string }>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 3px solid ${({ $spinnerColor }) => $spinnerColor};
  background: transparent;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export const SCWrapperSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
