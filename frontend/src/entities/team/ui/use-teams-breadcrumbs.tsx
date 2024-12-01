import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Section, Team, TeamLink } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { useBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";

export function useTeamsBreadcrumbs(team?: Team, section?: Section) {
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
          <>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <TeamLink team={team} />
            </BreadcrumbLink>
            {section && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <TeamLink team={team} section={section} />
                </BreadcrumbLink>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>,
  );
}
