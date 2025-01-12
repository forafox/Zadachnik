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
  filter?: (value: User) => void;
};

export const SelectUser = forwardRef<HTMLButtonElement, Props>(
  ({ value, onChange, filter }, ref) => {
    const { data } = useQuery(getUsersQueryOptions({ page: 1, pageSize: 50 }));

    function handleChange(idStr: string) {
      const id = parseInt(idStr);
      onChange(data?.values.find((user) => user.id === id));
    }

    const filteredUsers =
      (filter ? data?.values.filter(filter) : data?.values) ?? [];

    return (
      <Select
        value={value ? String(value?.id) : undefined}
        onValueChange={handleChange}
      >
        <SelectTrigger ref={ref}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {filteredUsers.map((user) => (
            <SelectItem key={user.id} value={String(user.id)}>
              {user.fullName}
            </SelectItem>
          ))}
          {filteredUsers.length == 0 && (
            <p className="text-muted-foreground">No users found 😢</p>
          )}
        </SelectContent>
      </Select>
    );
  },
);
