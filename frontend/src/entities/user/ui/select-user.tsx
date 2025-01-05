import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react";
import { getUsersQueryOptions, User } from "@/entities/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";

type Props = {
  value: User | undefined;
  onChange: (value: User | undefined) => void;
};

export const SelectUser = forwardRef<HTMLButtonElement, Props>(
  ({ value, onChange }, ref) => {
    const { data } = useQuery(getUsersQueryOptions({ page: 1, pageSize: 50 }));

    function handleChange(idStr: string) {
      const id = parseInt(idStr);
      onChange(data?.values.find((user) => user.id === id));
    }

    return (
      <Select
        value={value ? String(value?.id) : undefined}
        onValueChange={handleChange}
      >
        <SelectTrigger ref={ref}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {data?.values.map((user) => (
            <SelectItem key={user.id} value={String(user.id)}>
              {user.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
