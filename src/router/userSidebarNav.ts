import Bookings from "@/page/user/Bookings";
import type { ISidebarItem } from "@/types";
import { IconDashboard } from "@tabler/icons-react";
export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "Bookings",
        url: "bookings",
        component: Bookings,
        icon: IconDashboard,
        index: true,
      },
    ],
  },
];
