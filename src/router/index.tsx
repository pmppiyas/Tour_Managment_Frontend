import Login from "@/components/modules/auth/Login";
import Register from "@/components/modules/auth/Register";
import Verify from "@/components/modules/auth/verify";
import DashboardLayout from "@/layouts/DashboardLayout";
import ErrorPage from "@/page/shared/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/page/shared/NotFound";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "@/router/adminSidebarNav";
import { userSidebarItems } from "@/router/userSidebarNav";
import { checkAuth } from "@/middleware/checkAuth";
import { Role } from "@/constants/role";
import TourDetail from "@/components/modules/tour/TourDetail";
import All_Tour from '@/page/shared/All_Tour';
import HomePage from '@/page/shared/HomePage';
import Features from '@/page/shared/Features';
import TourBooking from '@/components/modules/tour/TourBooking';

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
      {
        index: true,
        Component: HomePage,
      },
      { path: "/features", Component: Features },
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
        path: "tours",
        Component: All_Tour,

      },
      {
        path: "/tours/:slug",
        Component: TourDetail,
      },
      {
        path: "/tours/booking/:slug",
        Component: TourBooking
      }
    ],
  },
  {
    path: "/admin",
    Component: checkAuth(DashboardLayout, [Role.SUPER_ADMIN, Role.ADMIN]),
    children: [...generateRoutes(adminSidebarItems)],
  },

  {
    path: "/user",
    Component: checkAuth(DashboardLayout, [Role.USER]),
    children: [...generateRoutes(userSidebarItems)],
  },
]);
