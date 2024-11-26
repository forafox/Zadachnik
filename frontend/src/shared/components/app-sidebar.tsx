import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/shared/components/ui/sidebar.tsx";

type Props = {
  principalSlot?: React.ReactNode;
  productsSlot?: React.ReactNode;
  teamsSlot?: React.ReactNode;
};

export function AppSidebar({ principalSlot, productsSlot, teamsSlot }: Props) {
  return (
    <Sidebar>
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
      <SidebarFooter className="gap-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>
              <span className="size-4 bg-yellow-300" />
              You've got a meeting!
            </CardTitle>
            <CardDescription>
              You have a daily meeting with "Three Baristas" team in 5 minutes
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Join</Button>
          </CardFooter>
        </Card>
        {principalSlot}
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarTeams() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your Teams</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Three Baristas</SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Issues</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Meetings</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Sprints</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
