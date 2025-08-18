import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";



export default function DashboardLayout() {
  return (

    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6  h-full  border-3 ">
          <Outlet />

        </div>
      </SidebarInset>
    </SidebarProvider>


  );
}
