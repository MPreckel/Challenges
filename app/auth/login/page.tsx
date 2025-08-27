"use client";

import {
  SCButton,
  SCButtonWrapper,
  SCEmailLabel,
  SCEmailWrapper,
  SCErrorEmail,
  SCErrorPassword,
  SCForm,
  SCLoginFormWrapper, 
  SCPasswordWrapper,
  SCTitleWrapper,
  SCInput,
  SCError,
  SCPasswordLabel,
  SCInputsWrapper,
} from "./loginPage.styles";
import { labels } from "@/messages/messages";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const {
    formData,
    errors,
    formError,
    isLoading,
    authError,
    handleChange,
    handleSubmit,
  } = useLoginPage();

  if (isLoading) {
    return (
      <SCLoginFormWrapper>
        <div>{labels.loading}</div>
      </SCLoginFormWrapper>
    );
  }

  return (
    <SCLoginFormWrapper>
      <SCTitleWrapper>{labels.login}</SCTitleWrapper>
      {formError && (
        <SCError>
          {formError}
        </SCError>
      )}
      {authError && (
        <SCError>
          {authError}
        </SCError>
      )}
      <SCForm onSubmit={handleSubmit}>
        <SCInputsWrapper>
            <SCEmailWrapper>
              <SCEmailLabel>{labels.email}</SCEmailLabel>
            </SCEmailWrapper>
            <SCInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <SCErrorEmail>{errors.email}</SCErrorEmail>
            )}
            <SCPasswordWrapper>
              <SCPasswordLabel>{labels.password}</SCPasswordLabel>
            </SCPasswordWrapper>
            <SCInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              placeholder="••••••••"
            />
            {errors.password && (
              <SCErrorPassword>{errors.password}</SCErrorPassword>
            )}
        </SCInputsWrapper>
        <SCButtonWrapper>
          <SCButton type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </SCButton>
        </SCButtonWrapper>
      </SCForm>
    </SCLoginFormWrapper>
  );
}
