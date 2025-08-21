import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hacer que las variables de entorno estén disponibles en el navegador
  env: {
    // Cargar los usuarios desde el archivo .env.local
    NEXT_PUBLIC_USERS: process.env.USERS || '[]',
  },
  // Configuración de seguridad para las variables de entorno
  // Esto evita que las variables sensibles se expongan en el cliente
  publicRuntimeConfig: {
    // Aquí podrías agregar configuraciones que necesites en el cliente
  },
  serverRuntimeConfig: {
    // Aquí van las configuraciones solo para el servidor
  },
};

export default nextConfig;
