"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  User,
  UserCredentials,
} from "./AuthContext.interface";

// Creamos el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error al recuperar la sesión:", err);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };
console.log('process.env.ADMIN_EMAIL', process.env.ADMIN_EMAIL);
    checkAuth();
  }, []);

  // Usuarios de prueba (en un caso real, esto vendría de una API o base de datos)
  const mockUsers: UserCredentials[] = [
    { email: "usuario1@ejemplo.com", password: "password123", name: "Manuel" },
    { email: "usuario2@ejemplo.com", password: "segura456", name: "Pedro" },
    { email: "usuario3@ejemplo.com", password: "clave789", name: "Juan" },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Validar que los campos no estén vacíos
      if (!email.trim() || !password.trim()) {
        throw new Error("Por favor completa todos los campos");
      }

      // 2. Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Por favor ingresa un email válido");
      }

      // 3. Simular tiempo de respuesta de la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Buscar el usuario en la lista de usuarios de prueba
      const users = [];
      const user1 = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      };
      const user2 = {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      };
      const user3 = {
        email: process.env.GUEST_EMAIL,
        password: process.env.GUEST_PASSWORD,
      };
      users.push(user1, user2, user3);
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
    
      if (!user) {
        throw new Error("Email o contraseña incorrectos");
      } else {
        // 5. Si todo es correcto, guardar el usuario
        const userData: User = { email: String(user.email), name: String(user.name) };
        if (user && user.email && user.name) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }

        return true;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // 1. Iniciar estado de carga
      setIsLoading(true);

      // 2. Simular tiempo de respuesta (como si fuera una llamada a una API)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 3. Limpiar el estado de autenticación
      setUser(null);

      // 4. Eliminar datos de sesión del almacenamiento local
      localStorage.removeItem("user");

      // 5. Limpiar cualquier error previo
      setError(null);
    } catch (err) {
      // 6. Manejar errores inesperados
      console.error("Error durante el cierre de sesión:", err);
      setError("Ocurrió un error al cerrar la sesión");
      throw err; // Re-lanzar el error para que el componente que llama pueda manejarlo si es necesario
    } finally {
      // 7. Asegurarse de desactivar el estado de carga
      setIsLoading(false);
    }
  };
  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Cargando...</div>}
    </AuthContext.Provider>
  );
}
