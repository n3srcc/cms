import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, isAdmin, isCreator } from '../authUtils';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CMS</Link>
        <ul className="flex space-x-4">
          {isAuthenticated() ? (
            <>
              {isAdmin() && (
                <>
                <li><Link to="/management/topic">Temáticas</Link></li>
                <li><Link to="/management/content-category">Categorias</Link></li>
                </>
              )}
              {isCreator() && (
                <li><Link to="/management/content">Contenido</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="text-blue-300 hover:text-white">Salir</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
