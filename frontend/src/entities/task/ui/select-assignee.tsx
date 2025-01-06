import * as SelectPrimitive from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { UserMinus, UserSearch } from "lucide-react";
import { forwardRef, useState } from "react";
import {
  getUsersQueryOptions,
  User,
  UserAvatar,
  UserHoverCard,
} from "@/entities/user";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
} from "@/shared/components/ui/select.tsx";

type Props = {
  value: User | undefined;
  onChange: (value: User | undefined) => void;
};

export const SelectAssignee = ({ value, onChange }) => {
  const { data } = useQuery(getUsersQueryOptions({ page: 1, pageSize: 50 }));
  const [open, setOpen] = useState(false);

  function handleChange(idStr: string) {
    const id = parseInt(idStr);
    onChange(data?.values.find((user) => user.id === id));
  }

  function handleOpen() {
    setOpen((open) => !open);
  }

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value ? String(value?.id) : undefined}
      onValueChange={handleChange}
      key={value?.id}
    >
      {value && (
        <>
          <SelectPrimitive.Trigger asChild>
            <span onClick={handleOpen}>
              <UserHoverCard user={value} />
            </span>
          </SelectPrimitive.Trigger>
        </>
      )}
      {!value && (
        <SelectPrimitive.Trigger asChild>
          <Button variant="outline" size="sm" className="h-6">
            <UserSearch className="mr-2 size-4" />
            Assign
          </Button>
        </SelectPrimitive.Trigger>
      )}
      <SelectContent>
        {value && (
          <SelectItem value={"undefined"}>
            <div className="flex items-center">
              <UserMinus className="mr-2 size-4" />
              No assignee
            </div>
          </SelectItem>
        )}
        {data?.values.map((user) => (
          <SelectItem key={user.id} value={String(user.id)}>
            <div className="flex items-center">
              <UserAvatar
                user={user}
                className="mr-2 size-4 text-xs font-light"
              />
              {user.fullName}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
