import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface UserData {
  isAdmin: boolean;
}

const ProtectedRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const userDataString = localStorage.getItem('userData');
  const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
  const isAdmin = userData && userData.isAdmin;

  if (!isAdmin) {
    // Si el usuario no es admin, redirigir a una página de acceso denegado o a otra página
    return <Navigate to="/access-denied" />;
  }

  // Si el usuario es admin, renderizar el componente correspondiente
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
