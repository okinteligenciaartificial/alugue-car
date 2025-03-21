import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Users, Calendar, LayoutDashboard, LogOut } from 'lucide-react';

export default function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold">Alugue Car</span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clientes"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Users className="h-5 w-5" />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/veiculos"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Car className="h-5 w-5" />
                <span>Veículos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reservas"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Calendar className="h-5 w-5" />
                <span>Reservas</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-semibold">Sistema de Aluguel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.nome}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
              >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}