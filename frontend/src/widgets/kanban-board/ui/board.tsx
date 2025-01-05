import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useQueries } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
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
import { useState } from "react";

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
  const [activeTask, setActiveTask] = useState<Task | undefined>();

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(active.data.current.task as Task);
  };

  function handleDragEnd({ active, over }: DragEndEvent) {
    console.log("drag end", active.data.current.task, over?.id);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full flex-row gap-2">
        {groups.map((group) => (
          <BoardColumn productId={productId} group={group} key={group} />
        ))}
      </div>
      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}

function BoardColumn({
  group,
  productId,
}: {
  group: StatusGroup;
  productId: number;
}) {
  const { setNodeRef } = useDroppable({
    id: group,
  });
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
    <Card className="w-full bg-gray-50" ref={setNodeRef}>
      <CardHeader className="flex flex-row items-center justify-between p-2 font-bold capitalize">
        <h3>{group}</h3>
        {pending && <LoaderCircle className="ml-auto size-4 animate-spin" />}
      </CardHeader>
      <main className="p-2">
        {tasks?.map((task) => <DraggableTask key={task.id} task={task} />)}
      </main>
    </Card>
  );
}

function DraggableTask({task}: {task: Task}) {
  const { setNodeRef, transform, attributes, listeners, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };


  return <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
    <TaskCard task={task} />
  </div>
}

function TaskCard({ task }: { task: Task }) {

  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">{task.description}</CardContent>
    </Card>
  );
}
