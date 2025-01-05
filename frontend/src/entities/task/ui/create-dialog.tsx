import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  createTaskMutationRequestSchema,
  CreateTaskValues,
  useCreateTaskMutation,
} from "@/entities/task";
import { SelectTaskType } from "@/entities/task/ui/select-type.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog.tsx";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form.tsx";
import { Input } from "@/shared/components/ui/input.tsx";

type Props = {
  productId: number;
  onClose: () => void;
};

export function CreateTaskDialogContent({ productId, onClose }: Props) {
  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskMutationRequestSchema),
    defaultValues: {
      productId,
      status: "backlog",
    },
  });
  const { t } = useTranslation("task");
  const { mutate, isPending } = useCreateTaskMutation();

  function handleSubmit(values: CreateTaskValues) {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}>
          <DialogHeader>
            <DialogTitle>{t("actions.create.title")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 [&>*]:grid [&>*]:gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.title.label")}</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.type.label")}</FormLabel>
                  <SelectTaskType {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.description.label")}</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button loading={isPending} type="submit">
              {t("actions.create.label")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
