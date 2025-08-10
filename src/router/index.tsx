import Login from "@/components/modules/auth/Login";
import Register from "@/components/modules/auth/Register";
import ErrorPage from "@/layouts/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/layouts/NotFound";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "*",
        Component: NotFound,
      },
      { path: "/auth/register", Component: Register },
      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
]);
