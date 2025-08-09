import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center text-4xl font-semibold ">
      <Navbar></Navbar>
      <div className="grow-1 w-full ">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
