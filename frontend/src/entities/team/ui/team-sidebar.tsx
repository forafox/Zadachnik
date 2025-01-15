import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { TeamLink } from "@/entities/team";
import { getPrincipalTeamsQueryOptions, Team } from "@/entities/team/api";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { RockingChairIcon } from "@/shared/components/ui/rocking-chair.tsx";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar.tsx";
import { TimerIcon } from "@/shared/components/ui/timer.tsx";
import { useIconsWithControls } from "@/shared/hooks/use-icons-with-controls.tsx";
import { FeatureFlag } from "@/shared/lib/feature-flags.tsx";

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
  const icons = useIconsWithControls({
    meetings: RockingChairIcon,
    sprints: TimerIcon,
  });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <TeamLink team={team} />
      </SidebarMenuButton>
      <SidebarMenuSub>
        {(["meetings", "sprints"] as const).map((section) => (
          <Fragment key={section}>
            <FeatureFlag key={section} flag={`teams.${section}`}>
              <SidebarMenuSubItem
                onMouseEnter={() => icons[section].controls.start("animate")}
                onMouseLeave={() => icons[section].controls.start("normal")}
              >
                <SidebarMenuSubButton asChild>
                  <TeamLink
                    data-testid={section}
                    team={team}
                    section={section}
                    before={icons[section].icon({
                      controls: icons[section].controls,
                    })}
                  />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </FeatureFlag>
          </Fragment>
        ))}
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
