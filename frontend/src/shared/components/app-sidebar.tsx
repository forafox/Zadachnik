import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/shared/components/ui/sidebar.tsx";

type Props = {
  principalSlot?: React.ReactNode;
  productsSlot?: React.ReactNode;
  teamsSlot?: React.ReactNode;
};

export function AppSidebar({ principalSlot, productsSlot, teamsSlot }: Props) {
  return (
    <Sidebar data-testid="sidebar">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="font-mono text-2xl font-bold leading-none"
        >
          Zadachnik
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {teamsSlot}
        <SidebarSeparator />
        {productsSlot}
      </SidebarContent>
      <SidebarFooter className="gap-4">{principalSlot}</SidebarFooter>
    </Sidebar>
  );
}
