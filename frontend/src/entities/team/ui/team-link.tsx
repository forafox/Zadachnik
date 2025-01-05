import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { Team } from "../api";

export type Section = "sprints" | "meetings";

type Props = {
  team: Team;
  section?: Section;
  className?: string;
  before?: React.ReactNode;
};

export function TeamLink({ team, section, before, ...props }: Props) {
  const { t } = useTranslation("team");

  if (section == undefined) {
    return (
      <Link to="/teams/$teamId" params={{ teamId: String(team.id) }} {...props}>
        {before}
        {team.title}
      </Link>
    );
  }

  if (section == "meetings") {
    return (
      <Link
        to="/teams/$teamId/meetings"
        params={{ teamId: String(team.id) }}
        {...props}
      >
        {before}
        {t("items.meetings.label")}
      </Link>
    );
  }

  if (section == "sprints") {
    return (
      <Link
        to="/teams/$teamId/sprints"
        params={{ teamId: String(team.id) }}
        search={defaultPagination}
        {...props}
      >
        {before}
        {t("items.sprints.label")}
      </Link>
    );
  }
}
