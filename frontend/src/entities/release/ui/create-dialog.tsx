import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import {
  createReleaseMutationRequestSchema,
  useCreateReleaseMutation,
} from "@/entities/release";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SelectSprint } from "@/entities/sprint";
import { SelectTasks } from "@/entities/task";
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
import { Textarea } from "@/shared/components/ui/textarea.tsx";
import { useDialogOnClose } from "@/shared/hooks/use-dialog.tsx";

type Values = z.infer<typeof createReleaseMutationRequestSchema>;

export function CreateReleaseDialogContent({
  productId,
}: {
  productId: number;
}) {
  const onClose = useDialogOnClose();
  const { t } = useTranslation("release");
  const form = useForm<Values>({
    resolver: zodResolver(createReleaseMutationRequestSchema),
    defaultValues: {
      productId,
      tasks: [],
    },
  });
  const { mutate, isPending } = useCreateReleaseMutation();

  function handleSubmit(values: Values) {
    mutate(values, {
      onSuccess: onClose,
    });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))}>
          <DialogHeader>
            <DialogTitle>{t("actions.create.title")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.version.label")}</FormLabel>
                  <Input
                    placeholder={t("items.version.placeholder")}
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.releaseNotes.label")}</FormLabel>
                  <Textarea
                    placeholder={t("items.releaseNotes.placeholder")}
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sprint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.sprint.label")}</FormLabel>
                  <SelectSprint teamId={1} {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.tasks.label")}</FormLabel>
                  <SelectTasks modal productId={productId} {...field} />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" loading={isPending}>
              {t("actions.create.label")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
