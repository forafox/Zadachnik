import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, SaveIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CommentItem } from "@/entities/comment";
import { getProductByIdQueryOptions, ProductLink } from "@/entities/product";
import {
  createTaskCommentMutationRequest,
  getTaskByIdQueryOptions,
  getTaskCommentsQueryOptions,
  Task,
  TaskStatus,
  TaskTypeBadge,
  useCreateTaskCommentMutation,
  useUpdateTaskMutation,
} from "@/entities/task";
import { SelectAssignee } from "@/entities/task";
import { TaskDescription } from "@/entities/task";
import { SelectTaskStatus } from "@/entities/task";
import { TaskChanges } from "@/entities/task";
import { User } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table.tsx";
import {
  createArticleRequestSchema,
  useCreateArticleComment,
} from "@/entities/article";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form.tsx";
import { Textarea } from "@/shared/components/ui/textarea.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/tasks/$taskId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("task");
  const { t: tProduct } = useTranslation("product");
  const { productId, taskId } = Route.useParams();
  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(Number(productId)),
  );
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
      assignee,
    });
  }

  function handleSetStatus(status: TaskStatus) {
    mutate({
      ...task,
      status,
    });
  }

  return (
    <Card className="mx-auto">
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link search={defaultPagination} to="/products">
                {tProduct("products.label")}
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <ProductLink product={product} />
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <ProductLink product={product} section={"tasks"} />
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link
                to="/products/$productId/tasks/$taskId"
                params={{ productId, taskId }}
              >
                {task.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <CardHeader className="space-y-2">
        <EditableTitle task={task} />
        <TaskDescription task={task} />
      </CardHeader>
      <CardContent className="space-y-8 p-4 [&>*]:space-y-4">
        <div>
          <h2 className="p-2 font-bold">{t("items.label")}</h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-[200px]">
                  {t("items.status.label")}
                </TableCell>
                <TableCell>
                  <SelectTaskStatus
                    disabled={isPending}
                    value={task.status}
                    onChange={handleSetStatus}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t("items.type.label")}</TableCell>
                <TableCell>
                  <TaskTypeBadge type={task.type} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t("items.assignee.label")}</TableCell>
                <TableCell>
                  <SelectAssignee
                    value={task.assignee}
                    onChange={handleSetAssignee}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <TaskComments task={task} />
        <TaskChanges task={task} />
      </CardContent>
    </Card>
  );
}

function TaskComments({ task }: { task: Task }) {
  const { t } = useTranslation("task");
  const { data: comments } = useSuspenseQuery(
    getTaskCommentsQueryOptions({
      productId: task.product.id,
      taskId: task.id,
      page: 1,
      pageSize: 50,
    }),
  );

  return (
    <div>
      <h2 className="font-bold">{t("items.comments.label")}</h2>
      <div className="space-y-2">
        {comments.values.length == 0 && (
          <p className="text-muted-foreground">
            {t("items.comments.feedback.noData.label")}
          </p>
        )}
        {comments.values.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
      <SendComment taskId={task.id} productId={task.product.id} />
    </div>
  );
}

function EditableTitle({ task }: { task: Task }) {
  const { mutate, isPending } = useUpdateTaskMutation();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveTitle = () => {
    mutate(
      {
        ...task,
        title: inputRef.current?.value ?? task.title,
      },
      {
        onSuccess: () => setIsEditingTitle(false),
      },
    );
  };

  return (
    <CardTitle className="flex items-center justify-between space-x-2">
      <div className="flex-1">
        {isEditingTitle ? (
          <Input className="h-8" ref={inputRef} defaultValue={task.title} />
        ) : (
          <span>{task.title}</span>
        )}
      </div>
      <div className="ml-auto">
        {isEditingTitle ? (
          <Button
            size="icon"
            variant="outline"
            className="size-8"
            onClick={handleSaveTitle}
            loading={isPending}
          >
            <SaveIcon />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            className="size-8"
            onClick={() => setIsEditingTitle(true)}
            loading={isPending}
          >
            <Pencil />
          </Button>
        )}
      </div>
    </CardTitle>
  );
}

function SendComment({
  productId,
  taskId,
}: {
  taskId: number;
  productId: number;
}) {
  const { mutate, isPending } = useCreateTaskCommentMutation();
  const form = useForm<z.infer<typeof createTaskCommentMutationRequest>>({
    resolver: zodResolver(createTaskCommentMutationRequest),
    defaultValues: {
      productId,
      taskId,
      content: "",
    },
  });

  function onSend(values: z.infer<typeof createTaskCommentMutationRequest>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form className="mt-4 space-y-2" onSubmit={form.handleSubmit(onSend)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <Textarea placeholder={"Leave a comment"} required {...field} />
          )}
        />
        <div className="flex flex-row justify-end">
          <Button variant="outline" type="submit" size="sm" loading={isPending}>
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
