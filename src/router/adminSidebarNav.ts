import Add_Tour from "@/page/admin/Add_Tour";
import Add_TourType from "@/page/admin/Add_TourType";
import All_Tour from "@/page/admin/All_Tour";
import Analytics from "@/page/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { IconDashboard, IconCopyPlus, IconTexture } from "@tabler/icons-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Fakira",
        url: "",
        index: true,
        component: Analytics,
        icon: IconDashboard,
      },
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
      {
        title: "Add Tour Type",
        url: "add_tourtype",
        component: Add_TourType,
        icon: IconCopyPlus,
      },
    ],
  },
];
