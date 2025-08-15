import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      DashboardLayout
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
