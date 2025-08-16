import { Role } from "@/constants/role";
import { adminSidebarItems } from "@/router/adminSidebarNav";
import { userSidebarItems } from "@/router/userSidebarNav";
import type { TRole } from "@/types";

export const getSidebarItems = (role: TRole) => {
  switch (role) {
    case Role.SUPER_ADMIN || Role.ADMIN:
      return [...adminSidebarItems];

    case Role.USER:
      return [...userSidebarItems];
    default:
      return [];
  }
};
