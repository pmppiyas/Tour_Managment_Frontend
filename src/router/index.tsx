import Login from "@/components/modules/auth/Login";
import Register from "@/components/modules/auth/Register";
import Verify from "@/components/modules/auth/verify";
import DashboardLayout from "@/layouts/DashboardLayout";
import ErrorPage from "@/page/shared/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/page/shared/NotFound";
import { createBrowserRouter } from "react-router";
import Analytics from "@/page/admin/Analytics";
import Bookings from "@/page/user/Bookings";
import Add_Tour from "@/page/admin/Add_Tour";

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
      {
        path: "/admin",
        Component: DashboardLayout,
        children: [
          {
            path: "analytices",
            element: <Analytics />,
          },
          {
            path: "add_tour",
            element: <Add_Tour />,
          },
        ],
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
    ],
  },
]);
