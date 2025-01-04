import { TableOptions } from "@tanstack/react-table";
import { DateTime } from "@/shared/components/ui/date-time.tsx";

type DefaultColumnType<T> = TableOptions<T>["defaultColumn"];

export function getDefaultColumn<T>() {
  return {
    cell: ({ getValue }) => {
      const value = getValue();
      if (value instanceof Date) {
        return <DateTime value={value} />;
      }

      return value;
    },
  } as DefaultColumnType<T>;
}
