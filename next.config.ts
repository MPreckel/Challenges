import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hacer que las variables de entorno estén disponibles en el navegador
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    GUEST_EMAIL: process.env.GUEST_EMAIL,
    GUEST_PASSWORD: process.env.GUEST_PASSWORD,
  },
  // Configuración de seguridad para las variables de entorno
  publicRuntimeConfig: {
    // Variables accesibles tanto en el servidor como en el cliente
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  serverRuntimeConfig: {
    // Variables accesibles solo en el servidor
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
  },
};

export default nextConfig;
