import { privateRoutes, publicRoutes } from "@/constants/routes.constants";
import React from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { auth } from "@/auth";

export default async function SidebarNavMenu() {
  const session = await auth();
  const navItems = [...publicRoutes, ...(session?.user ? privateRoutes : [])];
  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <Link href={item.path} className="flex gap-2 items-center">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="capitalize">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
