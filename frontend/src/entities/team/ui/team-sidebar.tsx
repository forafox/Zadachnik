import { useQuery } from "@tanstack/react-query";
import { TeamLink } from "@/entities/team";
import { getPrincipalTeamsQueryOptions, Team } from "@/entities/team/api";
import { defaultPagination } from "@/shared/api/schemas.ts";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar.tsx";

export function TeamsSidebar() {
  const { data, isPending, error } = useQuery(
    getPrincipalTeamsQueryOptions(defaultPagination),
  );

  if (error) {
    return error.message;
  }

  if (isPending) {
    return <TeamsSidebarSkeleton />;
  }

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

export function TeamsSidebarSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
