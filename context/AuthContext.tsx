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

  const authInstance = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(authInstance, googleProvider);
      // User state updates handled by useAuth hook internally
    } catch (error: unknown) {
      // You can add logging or user-friendly messages here
      throw error instanceof Error ? error : new Error("Google sign-in failed");
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
