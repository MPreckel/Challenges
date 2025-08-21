import styled from "styled-components";

export const SCLoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
`;

export const SCTitleWrapper = styled.h2`
  color: #111827;
  font-size: 1.875rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
`;

export const SCForm = styled.form`
  width: 100%;
  max-width: 28rem;
  background: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const SCInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SCEmailWrapper = styled.div`
`;

export const SCEmailLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const SCPasswordWrapper = styled.div`
`;
export const SCPasswordLabel = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const SCInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid ${(props) => (props.$hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SCButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const SCButton = styled.button`
  width: 100%;
  padding: 0.625rem 1rem;
  background-color: #4f46e5;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #4338ca;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }
`;

export const SCErrorEmail = styled.div`
  margin-top: 0.25rem;
  color: #ef4444;
  font-size: 0.75rem;
`;

export const SCErrorPassword = styled(SCErrorEmail)``;

export const SCError = styled.div`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;
