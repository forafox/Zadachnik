import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getTaskByIdQueryOptions,
  TaskTypeBadge,
  useUpdateTaskMutation,
} from "@/entities/task";
import { TaskStatusBadge } from "@/entities/task";
import { SelectAssignee } from "@/entities/task";
import { User } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/tasks/$taskId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId, taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(
    getTaskByIdQueryOptions({
      productId: Number(productId),
      taskId: Number(taskId),
    }),
  );

  const { mutate, isPending } = useUpdateTaskMutation();

  function handleSetAssignee(assignee: User | undefined) {
    mutate({
      ...task,
      productId: Number(productId),
      assignee,
    });
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="flex flex-row items-center gap-2 text-xl">
          {task.title}
        </CardTitle>
        <CardDescription className="flex flex-row gap-2"></CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="p-2">Properties</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[200px]">Status</TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>
                <TaskTypeBadge type={task.type} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Assignee</TableCell>
              <TableCell>
                <SelectAssignee
                  value={task.assignee}
                  onChange={handleSetAssignee}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
