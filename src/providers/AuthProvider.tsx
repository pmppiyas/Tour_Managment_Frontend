import { AuthContext } from "@/context/auth.context";
import { useMe } from "@/hooks/useMe";
import Loading from "@/page/shared/Loading";
import { type ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { me, loading, error, refetch } = useMe();
  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ me, loading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
