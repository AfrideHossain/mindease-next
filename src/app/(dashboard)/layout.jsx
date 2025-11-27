import AppSideBar from "@/components/Sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                      /> */}
            </div>
          </header>
          {/* main contents */}
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
