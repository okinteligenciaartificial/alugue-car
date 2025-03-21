import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Veiculos from './pages/Veiculos';
import Reservas from './pages/Reservas';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="veiculos" element={<Veiculos />} />
            <Route path="reservas" element={<Reservas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App