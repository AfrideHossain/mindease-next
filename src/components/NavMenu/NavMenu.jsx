"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { publicRoutes } from "@/constants/routes.constants";

export function NavMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const selectedDate = new Date();
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const loogedIn = Boolean(session);

  const menuItems = [
    ...publicRoutes,
    ...(loogedIn
      ? [{ sl: 99, title: "journals", path: `/journal?date=${formattedDate}` }]
      : []),
  ];
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item, indx) => {
          let isActive =
            item.path === pathname ||
            (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <NavigationMenuItem key={`${item.title}${indx}`}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()}`}
              >
                <Link
                  href={`${item.path}`}
                  className={`capitalize transition-colors ${
                    isActive
                      ? "bg-primary/20"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
