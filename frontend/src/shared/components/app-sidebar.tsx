import { Button } from "@/shared/components/ui/button.tsx";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card.tsx";
import {
  Sidebar,
  SidebarContent, SidebarFooter,
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
  SidebarSeparator
} from "@/shared/components/ui/sidebar.tsx";

export function AppSidebar() {
  return <Sidebar>
    <SidebarHeader>
      <SidebarMenuButton size="lg" className="text-2xl leading-none font-mono font-bold">
        Zadachnik
      </SidebarMenuButton>
    </SidebarHeader>
    <SidebarContent>
      <SidebarTeams />
      <SidebarSeparator />
      <SidebarProducts />
    </SidebarContent>
    <SidebarFooter>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>
            <span className="bg-yellow-300 size-4" />
            You've got a meeting!
          </CardTitle>
          <CardDescription>
            You have a daily meeting with "Three Baristas" team
            in 5 minutes
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">
            Join
          </Button>
        </CardFooter>
      </Card>
    </SidebarFooter>
  </Sidebar>;
}

function SidebarTeams() {
  return <SidebarGroup>
    <SidebarGroupLabel>
      Your Teams
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            Three Baristas
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                Issues
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                Meetings
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                Sprints
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>;
}

function SidebarProducts() {
  return <SidebarGroup>
    <SidebarGroupLabel>
      Your Products
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            Zadachnik
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                Issues
              </SidebarMenuSubButton>
              <SidebarMenuSubButton>
                Releases
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>;
}