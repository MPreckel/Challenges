"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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

// Definimos el tipo para los datos del formulario
type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error: authError } = useAuth();
  
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Estado para manejar errores
  const [errors, setFormErrors] = useState<Partial<FormData>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiamos el error del campo cuando el usuario comienza a escribir
    if (errors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Función para validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormError(null);
      const success = await login(formData.email, formData.password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setFormError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      }
    }
  };

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
