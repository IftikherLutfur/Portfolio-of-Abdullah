/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client"
import { IUser } from '@/types/types';
import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export default 
function AuthProvider({ children }: { children: React.ReactNode }) {
      const [user, setUser] = useState<IUser | null>(null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};;