import Login from "@/components/modules/auth/Login";
import Register from "@/components/modules/auth/Register";
import Verify from "@/components/modules/auth/verify";
import DashboardLayout from "@/layouts/DashboardLayout";
import ErrorPage from "@/page/shared/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/page/shared/NotFound";
import { createBrowserRouter } from "react-router";
import Bookings from "@/page/user/Bookings";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "@/router/adminSidebarNav";

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
      {
        path: "/auth/verify",
        Component: Verify,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [...generateRoutes(adminSidebarItems)],
  },

  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "bookings",
        element: <Bookings />,
      },
    ],
  },
]);
