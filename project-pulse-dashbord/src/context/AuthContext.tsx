import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call - In production, replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Check if user exists in localStorage (demo purposes)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };

    const token = `token_${Date.now()}`;
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call - In production, replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: { email: string }) => u.email === email);

    if (existingUser) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this should be hashed
      name,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Don't auto-login after signup - user must sign in manually
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

