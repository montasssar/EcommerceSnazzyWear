"use client";

import React, { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  // Add signInWithGoogle here
  const authInstance = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(authInstance, googleProvider);
      // user state update should be handled inside useAuth hook
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
