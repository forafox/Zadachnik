import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getProductTasksQueryOptions,
  StatusGroup,
  statusGroups,
  Task,
} from "@/entities/task";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { LoaderCircle } from "lucide-react";

type Tasks = Record<StatusGroup, Array<Task>>;

type Props = {
  productId: number;
};

const groups: Array<StatusGroup> = [
  "backlog",
  "started",
  "completed",
  "cancelled",
];

export function KanbanBoard({ productId }: Props) {
  return (
    <div className="flex w-full flex-row gap-2">
      {groups.map((group) => (
        <BoardColumn productId={productId} group={group} key={group} />
      ))}
    </div>
  );
}

function BoardColumn({
  group,
  productId,
}: {
  group: StatusGroup;
  productId: number;
}) {
  const { data: tasks, pending } = useQueries({
    queries: statusGroups[group].map((status) =>
      getProductTasksQueryOptions({ productId, status, page: 1, pageSize: 50 }),
    ),
    combine: (results) => {
      return {
        data: results.flatMap((it) => it.data?.values ?? []),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return (
    <Card className="w-full bg-gray-50">
      <CardHeader className="flex flex-row items-center justify-between p-2 font-bold capitalize">
        <h3>{group}</h3>
        {pending && <LoaderCircle className="ml-auto size-4 animate-spin" />}
      </CardHeader>
      <main className="p-2">
        {tasks?.map((task) => (
          <Card key={task.id}>
            <CardHeader className="p-2">
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">{task.description}</CardContent>
          </Card>
        ))}
      </main>
    </Card>
  );
}
