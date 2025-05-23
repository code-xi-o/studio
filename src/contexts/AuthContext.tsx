'use client';

import type { User } from '@/types/auth';
import type { PropsWithChildren} from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (username: string, pass: string, isAdminLogin?: boolean) => boolean; // Added isAdminLogin
  logout: () => void;
  signup: (username: string, pass: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('codepath_user');
    const storedIsAdmin = localStorage.getItem('codepath_isAdmin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin));
    }
  }, []);

  useEffect(() => {
    if(isMounted) {
      if (user) {
        localStorage.setItem('codepath_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('codepath_user');
      }
      localStorage.setItem('codepath_isAdmin', JSON.stringify(isAdmin));
    }
  }, [user, isAdmin, isMounted]);


  const login = (username: string, pass: string, isAdminLogin: boolean = false): boolean => {
    if (isAdminLogin) {
      if (username === 'kishan' && pass === 'kishan2314') {
        const adminUser = { id: 'admin001', username: 'kishan' };
        setUser(adminUser);
        setIsAdmin(true);
        return true;
      }
      return false;
    } else {
      // Mock user login
      if (username === 'testuser' && pass === 'password') {
        const regularUser = { id: 'user001', username: 'testuser' };
        setUser(regularUser);
        setIsAdmin(false);
        return true;
      }
      // Check if user exists for signup simulation
      const existingUser = localStorage.getItem(`mock_user_${username}`);
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.password === pass) {
          setUser({ id: parsedUser.id, username: parsedUser.username });
          setIsAdmin(false);
          return true;
        }
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const signup = (username: string, pass: string): boolean => {
    // Mock signup: check if user already exists in local storage
    if (localStorage.getItem(`mock_user_${username}`)) {
      return false; // User already exists
    }
    const newUser = { id: `user_${Date.now()}`, username, password: pass }; // Store password for mock login
    localStorage.setItem(`mock_user_${username}`, JSON.stringify(newUser));
    setUser({ id: newUser.id, username: newUser.username });
    setIsAdmin(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};