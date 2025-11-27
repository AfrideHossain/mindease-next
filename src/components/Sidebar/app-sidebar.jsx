import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import SidebarNavMenu from "./sidebar-nav-menu";
import SidebarHeadDiv from "./sidebar-head-div";
import SidebarUserSec from "./sidebar-user-sec";

export default function AppSideBar({ ...props }) {
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarHeadDiv />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavMenu />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUserSec />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
