import { useTranslation } from "react-i18next";
import { statusGroups, TaskStatus } from "@/entities/task";
import { colors, getStatusGroup } from "@/entities/task/ui/status-logic.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";
import { cn } from "@/shared/lib/utils.ts";

type Props = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
  disabled?: boolean;
};

const groups = statusGroups;
const groupNames = Object.keys(groups) as Array<keyof typeof groups>;

export function SelectTaskStatus({ value, onChange, disabled = false }: Props) {
  const { t } = useTranslation("task");
  const group = getStatusGroup(value);
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("h-6 w-auto", colors[group])}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {groupNames.map((group) => (
          <SelectGroup key={group}>
            <SelectLabel>{t(`items.status.items.${group}.label`)}</SelectLabel>
            {groups[group].map((status) => (
              <SelectItem value={status} key={status}>
                {t(`items.status.items.${group}.items.${status}.label`)}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
