'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { SCButton, SCDashboardContainer, SCMessageWrapper } from './dashBoard.styles';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }


  return (
    <SCDashboardContainer>
      <SCMessageWrapper>
      <h1>Bienvenido, {user.email}!</h1>
      <p>Has iniciado sesión correctamente.</p>
      </SCMessageWrapper>
      
      <SCButton
        onClick={handleLogout}
      >
        Cerrar sesión
      </SCButton>
    </SCDashboardContainer>
  );
};

export default DashboardPage;
