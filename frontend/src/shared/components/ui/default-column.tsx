import { TableOptions } from "@tanstack/react-table";
import { DateTime } from "@/shared/components/ui/date-time.tsx";

type DefaultColumnType = TableOptions<unknown>["defaultColumn"];

export const defaultColumn: DefaultColumnType = {
  cell: ({ getValue }) => {
    const value = getValue();
    if (value instanceof Date) {
      return <DateTime value={value} />;
    }

    return value;
  },
};
