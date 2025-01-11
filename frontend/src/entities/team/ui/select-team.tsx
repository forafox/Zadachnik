import { useSuspenseQuery } from "@tanstack/react-query";
import { getTeamsQueryOptions, Team } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas.ts";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/shared/components/ui/select.tsx";

type Props = {
  value: Team | undefined;
  onChange: (value: Team | undefined) => void;
  filter?: (value: Team) => boolean;
};

export function SelectTeam({ value, onChange, filter }: Props) {
  const {
    data: { values: teams },
  } = useSuspenseQuery(getTeamsQueryOptions(defaultPagination));

  function handleChange(id: string) {
    const team = teams.find((team) => team.id === parseInt(id));
    onChange(team);
  }

  const filteredTeams = filter ? teams.filter(filter) : teams;

  return (
    <Select
      value={value ? String(value.id) : undefined}
      onValueChange={handleChange}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {filteredTeams.map((team) => (
          <SelectItem key={team.id} value={String(team.id)}>
            {team.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
