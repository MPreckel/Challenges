import { ReactNode } from "react";

export type User = {
  email: string;
  name: string;
  // Podemos agregar más campos según necesitemos
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export type AuthProviderProps = {
    children: ReactNode;
  };

  export type UserCredentials = {
    email: string;
    password: string;
    name: string;
  };