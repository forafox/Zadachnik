import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/shared/components/app-sidebar.tsx";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar.tsx";

export const Layout = () => {
  return <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
      </header>
      <Outlet />
  </SidebarInset>
  </SidebarProvider>
}