import * as React from "react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: me } = useGetMeQuery(undefined);

  const role = me?.data?.role ? me?.data?.role : "USER";

  const data = {
    navMain: getSidebarItems(role),
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className=" flex flex-row justify-between">
        <Logo></Logo>
      </SidebarHeader>
      {data.navMain.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url || ""}
                      className="flex items-center gap-2"
                    >
                      {item.icon && (
                        <item.icon className="size-4 text-muted-foreground" />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </Sidebar>
  );
}
