import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Bem-vindo, {user?.nome}</h2>
        <p className="text-gray-600">Selecione uma opção no menu para começar.</p>
      </div>
    </div>
  );
}