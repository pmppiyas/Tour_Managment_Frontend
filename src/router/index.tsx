import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/layouts/NotFound";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
  },
]);
