import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useQueries } from "@tanstack/react-query";
import { GripHorizontalIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { TaskCard } from "@/widgets/kanban-board";
import { getSprintTasksQueryOptions } from "@/entities/sprint";
import {
  StatusGroup,
  statusGroups,
  Task,
  useUpdateTaskMutation,
} from "@/entities/task";
import { Card, CardHeader } from "@/shared/components/ui/card.tsx";

type Props = {
  sprintId: number;
  teamId: number;
};

const groups: Array<StatusGroup> = [
  "backlog",
  "started",
  "completed",
  "cancelled",
];

export function SprintKanbanBoard({ teamId, sprintId }: Props) {
  const [activeTask, setActiveTask] = useState<Task | undefined>();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const [overGroup, setOverGroup] = useState<StatusGroup | undefined>();

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(active.data.current!.task as Task);
  };

  function handleDragEnd({ active, over }: DragEndEvent) {
    const task = active.data.current!.task as Task;
    const group = over!.id as StatusGroup;
    const firstStatus = statusGroups[group][0];
    updateTask({
      ...task,
      status: firstStatus,
    });

    setActiveTask(undefined);
    setOverGroup(undefined);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverGroup((over?.id ?? undefined) as StatusGroup | undefined);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex w-full flex-row gap-2">
        {groups.map((group) => (
          <BoardColumn
            group={group}
            key={group}
            isPending={false}
            isOverCurrent={overGroup === group}
            activeTask={activeTask}
            teamId={teamId}
            sprintId={sprintId}
          />
        ))}
      </div>
      {/*<DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>*/}
    </DndContext>
  );
}

function BoardColumn({
  group,
  isPending,
  isOverCurrent,
  activeTask,
  sprintId,
  teamId,
}: {
  group: StatusGroup;
  isPending: boolean;
  isOverCurrent: boolean;
  activeTask: Task | undefined;
} & Props) {
  const { setNodeRef } = useDroppable({
    id: group,
    disabled: isPending,
  });
  const { data: tasks, pending } = useQueries({
    queries: statusGroups[group].map((status) =>
      getSprintTasksQueryOptions({
        teamId,
        sprintId,
        status,
        page: 1,
        pageSize: 50,
      }),
    ),
    combine: (results) => {
      return {
        data: results.flatMap((it) => it.data?.values ?? []),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return (
    <Card className="w-full min-w-[320px] bg-gray-50" ref={setNodeRef}>
      <CardHeader className="flex flex-row items-center justify-between p-2 font-bold capitalize">
        <h3>{group}</h3>
        {pending && <LoaderCircle className="ml-auto size-4 animate-spin" />}
      </CardHeader>
      <main className="space-y-2 p-2">
        {isOverCurrent && activeTask && (
          <div className="opacity-50">
            <TaskCard task={activeTask} />
          </div>
        )}
        {tasks?.map((task) => (
          <DraggableTask isPending={isPending} key={task.id} task={task} />
        ))}
      </main>
    </Card>
  );
}

function DraggableTask({
  task,
  isPending,
}: {
  task: Task;
  isPending: boolean;
}) {
  const { setNodeRef, transform, attributes, listeners, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
      },
      disabled: isPending,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  if (isDragging) return null;

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        dragSlot={
          <GripHorizontalIcon
            {...attributes}
            {...listeners}
            className="ml-auto size-4"
          />
        }
      />
    </div>
  );
}
