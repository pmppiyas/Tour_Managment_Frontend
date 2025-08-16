/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface AuthContextType {
  me: any;
  loading: boolean;
  error: any;
  refetch: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
