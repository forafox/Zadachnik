import { useSuspenseQuery } from "@tanstack/react-query";
import { TeamLink } from "@/entities/team";
import { getTeamsQueryOptions, Team } from "@/entities/team/api";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar.tsx";

export function TeamsSidebar() {
  const { data } = useSuspenseQuery(
    getTeamsQueryOptions({
      page: 1,
      pageSize: 10,
    }),
  );

  return (
    <SidebarMenu>
      {data.values.map((team) => (
        <TeamSidebarEntry key={team.id} team={team} />
      ))}
    </SidebarMenu>
  );
}

function TeamSidebarEntry({ team }: { team: Team }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <TeamLink team={team} />
      </SidebarMenuButton>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <TeamLink team={team} section={"meetings"} />
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <TeamLink team={team} section={"sprints"} />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}
