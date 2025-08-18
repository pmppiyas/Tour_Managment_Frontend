import Add_Tour from "@/page/admin/Add_Tour";
import Add_TourType from "@/page/admin/TourType";
import All_Tour from "@/page/shared/All_Tour";
import Analytics from "@/page/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { IconDashboard, IconCopyPlus, IconTexture } from "@tabler/icons-react";
import All_Division from "@/page/admin/All_Division";

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
        title: "Add A Tour",
        url: "add_tour",
        component: Add_Tour,
        icon: IconCopyPlus,
      },
      {
        title: "Manage Tour Type",
        url: "tourtype",
        component: Add_TourType,
        icon: IconCopyPlus,
      },
      {
        title: "Manage Tour Division",
        url: "tour_division",
        component: All_Division,
        icon: IconCopyPlus,
      },
    ],
  },
];
