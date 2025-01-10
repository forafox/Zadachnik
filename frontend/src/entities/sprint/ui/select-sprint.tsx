import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { forwardRef } from "react";
import { getTeamSprintsQueryOptions, Sprint } from "@/entities/sprint";
import { DateTime } from "@/shared/components/ui/date-time.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";

type Props = {
  teamId: number;
  value: Sprint | undefined;
  onChange: (value: Sprint | undefined) => void;
};

export const SelectSprint = forwardRef<HTMLButtonElement, Props>(
  function SelectSprint({ teamId, value, onChange }, ref) {
    const { data } = useQuery(
      getTeamSprintsQueryOptions({ teamId, page: 1, pageSize: 50 }),
    );

    function handleChange(idStr: string) {
      const id = parseInt(idStr);
      const sprint = data?.values.find((it) => it.id === id);

      onChange(sprint);
    }

    return (
      <Select
        value={value ? String(value.id) : undefined}
        onValueChange={handleChange}
      >
        <SelectTrigger ref={ref}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {data?.values.map((sprint) => (
            <SelectItem key={sprint.id} value={String(sprint.id)}>
              <DateTime value={sprint.startAt} showTime={false} /> &mdash;{" "}
              <DateTime
                value={addDays(sprint.startAt, sprint.length)}
                showTime={false}
              />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
