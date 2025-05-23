
'use client';

import type { User } from '@/types/auth';
import type { PropsWithChildren} from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (username: string, pass: string, isAdminLogin?: boolean) => boolean;
  logout: () => void;
  signup: (username: string, pass: string, asAdmin?: boolean) => boolean;
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
    // Attempt to log in the default admin if admin login is toggled
    if (isAdminLogin && username === 'kishan' && pass === 'kishan2314') {
      const adminUser = { id: 'admin001', username: 'kishan' };
      setUser(adminUser);
      setIsAdmin(true);
      return true;
    }

    // Check existing users from localStorage
    const existingUserString = localStorage.getItem(`mock_user_${username}`);
    if (existingUserString) {
      const parsedUser = JSON.parse(existingUserString);
      if (parsedUser.password === pass) {
        // If admin login is toggled, verify the user is indeed an admin
        if (isAdminLogin) {
          if (parsedUser.isAdmin) {
            setUser({ id: parsedUser.id, username: parsedUser.username });
            setIsAdmin(true);
            return true;
          } else {
            // Toggled admin, but user is not admin
            return false; 
          }
        } else {
          // Regular login attempt (admin toggle is off)
          setUser({ id: parsedUser.id, username: parsedUser.username });
          setIsAdmin(!!parsedUser.isAdmin); // Respect their stored admin status
          return true;
        }
      }
    }
    
    // Fallback for the original hardcoded testuser if admin toggle is off
    if (!isAdminLogin && username === 'testuser' && pass === 'password') {
        const regularUser = { id: 'user001', username: 'testuser' };
        setUser(regularUser);
        setIsAdmin(false); // testuser is not an admin
        return true;
    }

    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  // `asAdmin` will default to false if not provided, which is the case from the updated signup page
  const signup = (username: string, pass: string, asAdmin: boolean = false): boolean => {
    if (localStorage.getItem(`mock_user_${username}`)) {
      return false; // User already exists
    }
    const newUser = { id: `user_${Date.now()}`, username, password: pass, isAdmin: asAdmin }; 
    localStorage.setItem(`mock_user_${username}`, JSON.stringify(newUser));
    
    setUser({ id: newUser.id, username: newUser.username });
    setIsAdmin(asAdmin); // This will be false for all new signups via the form
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
