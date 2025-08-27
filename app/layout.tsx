'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from "@/components/ProtectedRoute";

const publicRoutes = ['/auth/login', '/auth/register'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));

  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {isPublicRoute ? children : <ProtectedRoute>{children}</ProtectedRoute>}
        </AuthProvider>
      </body>
    </html>
  );
}
