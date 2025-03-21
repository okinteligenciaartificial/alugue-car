import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/api';

interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  perfil: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = auth.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, senha: string) => {
    const { user } = await auth.login(email, senha);
    setUser(user);
  };

  const signOut = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}