import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Team, TeamLink } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { useBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/shared/components/ui/breadcrumb.tsx";

export function useTeamsBreadcrumbs(team?: Team) {
  const { t } = useTranslation("team");

  return useBreadcrumbs(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link to="/teams" search={defaultPagination}>
            {t("breadcrumbs.list.teams.title")}
          </Link>
        </BreadcrumbLink>
        {team && (
          <BreadcrumbLink asChild>
            <TeamLink team={team} />
          </BreadcrumbLink>
        )}
      </BreadcrumbList>
    </Breadcrumb>,
  );
}
