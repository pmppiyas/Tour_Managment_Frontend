import { Role } from "@/constants/role";
import Add_Tour from "@/page/admin/Add_Tour";
import All_Tour from "@/page/admin/All_Tour";
import Analytics from "@/page/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { checkAuth } from "@/utils/checkAuth";
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
        component: checkAuth(All_Tour, [Role.ADMIN, Role.SUPER_ADMIN]),
        icon: IconTexture,
      },
      {
        title: "Add A Tour",
        url: "add_tour",
        component: checkAuth(Add_Tour, [Role.ADMIN, Role.SUPER_ADMIN]),
        icon: IconCopyPlus,
      },
    ],
  },
];
