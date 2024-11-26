import { Team } from "../api";

export function TeamLink({ team }: { team: Team }) {
  return team.title;
}