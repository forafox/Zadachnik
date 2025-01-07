import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { forwardRef } from "react";
import z from "zod";
import {
  getTasksQueryOptions,
  getTasksRequestSchema,
  getTeamTasksQueryOptions,
  GetTeamTasksRequestValues,
  Task,
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
} & TaskFilter;

export const SelectTask = forwardRef<HTMLButtonElement, Props>(
  function SelectTeamTasks({ value, onChange, ...filters }, ref) {
    const [open, setOpen] = React.useState(false);
    const { data, error } = useQuery(getTasksQueryOptions(filters));

    console.log("Error:", error);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            ref={ref}
          >
            {value.length}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data?.values.map((framework) => (
                  <CommandItem
                    key={framework.id}
                    value={String(framework.id)}
                    onSelect={() => {
                      onChange([]);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        framework.title ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {framework.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
