import { useMe } from "@/hooks/useMe";
import type { IError, TRole } from "@/types";
import { Navigate } from "react-router";

export function checkAuth<P>(
  Component: React.ComponentType<P>,
  requiredRoles: TRole[]
) {
  return function AuthWrapper(props: P) {
    const { me, loading, error } = useMe();

    const err = error as IError;

    if (loading) return <p>Loading...</p>;

    if (err?.status === 403) {
      return <Navigate to="/" replace />;
    }

    if (err) return <p>Something went wrong!</p>;

    if (!me || !requiredRoles.includes(me.role)) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
}
