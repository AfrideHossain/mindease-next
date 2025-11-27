import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

export default function SidebarHeadDiv() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip={"Go to MindEase homepage"}
          asChild
        >
          <Link href={"/"}>
            <span className="truncate text-2xl font-bold">MindEase</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
