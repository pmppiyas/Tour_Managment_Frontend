import Add_Tour from "@/page/admin/Add_Tour";
import All_Tour from "@/page/admin/All_Tour";
import Analytics from "@/page/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { IconDashboard, IconCopyPlus, IconTexture } from "@tabler/icons-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "analytics",
        component: Analytics,
        icon: IconDashboard,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "All Tour",
        url: "all_tour",
        component: All_Tour,
        icon: IconTexture,
      },
      {
        title: "Add A Tour",
        url: "add_tour",
        component: Add_Tour,
        icon: IconCopyPlus,
      },
    ],
  },
];
