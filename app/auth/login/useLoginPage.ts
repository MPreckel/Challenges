

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FormData, UseLoginPage } from "./login.interface";
import { useRouter } from "next/navigation";

export const useLoginPage = (): UseLoginPage => {    
  const router = useRouter();
  const { login, isLoading, error: authError, user } = useAuth();
  
  // Redirigir si el usuario ya está autenticado
  
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
      await login(formData.email, formData.password);
    }
  };
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  
  return {
    formData,
    errors,
    formError,
    isLoading,
    authError,
    handleChange,
    validateForm,
    handleSubmit,
  };
}