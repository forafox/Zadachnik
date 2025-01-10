import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { forwardRef } from "react";
import z from "zod";
import {
  getTasksQueryOptions,
  getTasksRequestSchema,
  Task,
  TaskTypeBadge,
} from "@/entities/task";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover.tsx";
import { cn } from "@/shared/lib/utils.ts";

type TaskFilter = z.infer<typeof getTasksRequestSchema>;

type Props = {
  value: Task[];
  onChange: (value: Task[]) => void;
  modal?: boolean;
} & TaskFilter;

export const SelectTasks = forwardRef<HTMLButtonElement, Props>(
  function SelectTasks({ value, onChange, modal = false, ...filters }, ref) {
    const [open, setOpen] = React.useState(false);
    const { data } = useQuery(getTasksQueryOptions(filters));

    function toggleItem(task: Task) {
      if (value.some((it) => it.id === task.id)) {
        onChange(value.filter((it) => it.id !== task.id));
      } else {
        onChange([...value, task]);
      }
    }

    return (
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 py-2"
            ref={ref}
          >
            <div className="flex flex-row gap-2">
              {value.length == 0 && <span></span>}
              {value.map((it) => (
                <TaskTypeBadge key={it.id} type={it.type}>
                  {it.title}
                </TaskTypeBadge>
              ))}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data?.values.map((task) => {
                  const isSelected = value.some((it) => it.id === task.id);
                  return (
                    <CommandItem
                      key={task.id}
                      value={String(task.id)}
                      onSelect={() => {
                        toggleItem(task);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {task.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
