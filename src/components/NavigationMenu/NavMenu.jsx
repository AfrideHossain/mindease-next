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

export const menuItems = [
  {
    sl: 1,
    title: "home",
    path: "/",
    needSession: false,
  },
  {
    sl: 2,
    title: "dashboard",
    path: "/",
    needSession: false,
  },
  {
    sl: 3,
    title: "about",
    path: "/",
    needSession: false,
  },
];

export function NavMenu() {
  const pathname = usePathname();
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {menuItems.map((item) => {
          let isActive =
            item.path === pathname ||
            (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <NavigationMenuItem key={item.sl}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()}`}
              >
                <Link
                  href={`/${item.path}`}
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
