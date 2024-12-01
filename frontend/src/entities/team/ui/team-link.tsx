import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Team } from "../api";

export type Section = "sprints" | "meetings";

type Props = {
  team: Team;
  section?: Section;
  className?: string;
};

export function TeamLink({ team, section, ...props }: Props) {
  const { t } = useTranslation("team");

  if (section == undefined) {
    return (
      <Link to="/teams/$teamId" params={{ teamId: String(team.id) }} {...props}>
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
        {t("items.meetings.label")}
      </Link>
    );
  }

  if (section == "sprints") {
    return (
      <Link
        to="/teams/$teamId/sprints"
        params={{ teamId: String(team.id) }}
        {...props}
      >
        {t("items.sprints.label")}
      </Link>
    );
  }
}
