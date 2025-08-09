import Login from "@/components/modules/auth/login";
import Register from "@/components/modules/auth/Register";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/layouts/NotFound";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      { path: "/auth/register", Component: Register },
      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
]);
