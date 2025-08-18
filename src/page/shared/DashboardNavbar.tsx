
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

import { Role } from "@/constants/role";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardNavbar() {
  const { me: user } = useAuth();
  const userRole = user?.role;

  type TLINK = {
    href: string;
    label: string;
    roles: string[];
    active?: boolean
  }[]

  const navigationLinks: TLINK = [
    { href: "/", label: "Home", roles: ["PUBLIC"] },
    {
      active: true,
      href: "/admin",
      label: "Dashboard",
      roles: [Role.SUPER_ADMIN, Role.ADMIN],
    },
    { href: "/features", label: "Features", roles: ["PUBLIC"] },

    { href: "/tours", label: "All Tours", roles: ["PUBLIC"] },

    { href: "/user", label: "Dashboard", roles: [Role.USER] },
    { href: "/pricing", label: "Pricing", roles: [Role.USER] },
    { href: "/about", label: "About", roles: ["PUBLIC"] },
  ];

  const navbar = navigationLinks.filter((link) => {
    if (link.roles.includes("PUBLIC")) return true;
    return link.roles.includes(userRole);
  });





  return (
    <header className="border-b px-4 md:px-6 container bg-background">
      <div className="flex h-16 items-center justify-between gap-4">

        {/* Navigation menu */}
        <NavigationMenu className=" hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navbar.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  active={link.active}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  <Link to={link.href}> {link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

    </header >
  );
}
