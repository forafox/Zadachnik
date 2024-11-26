import { useSuspenseQuery } from "@tanstack/react-query";
import { getTeamsQueryOptions, Team } from "@/entities/team/api";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar.tsx";
import { TeamLink } from "./team-link";

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
    </SidebarMenuItem>
  );
}
