import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { TaskType, taskTypes } from "@/entities/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";

type Props = {
  value?: TaskType;
  onChange: (value: TaskType) => void;
};

export const SelectTaskType = forwardRef<
  React.ComponentRef<typeof SelectValue>,
  Props
>(function SelectTaskType({ value, onChange }, ref) {
  const { t } = useTranslation("task");

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue ref={ref} />
      </SelectTrigger>
      <SelectContent>
        {taskTypes.map((type) => (
          <SelectItem value={type} key={type}>
            {t(`items.type.items.${type}.label`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
