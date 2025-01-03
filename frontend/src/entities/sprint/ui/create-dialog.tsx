import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  createSprintRequestSchema,
  CreateSprintValues,
  useCreateSprintMutation,
} from "@/entities/sprint";
import { Button } from "@/shared/components/ui/button.tsx";
import { DatePicker } from "@/shared/components/ui/date-picker.tsx";
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
import { TimePickerInput } from "@/shared/components/ui/time-picker-input.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";

export function CreateSprintDialogContent({
  teamId,
  onClose,
}: {
  onClose: () => void;
  teamId: number;
}) {
  const form = useForm<CreateSprintValues>({
    resolver: zodResolver(createSprintRequestSchema),
    defaultValues: {
      teamId,
    },
  });
  const { t } = useTranslation("sprint");
  const { mutate, isPending, error } = useCreateSprintMutation();

  function handleSubmit(values: CreateSprintValues) {
    mutate(values, {
      onSuccess: ({ id }) => {},
    });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("actions.create.title")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 [&>*]:grid [&>*]:gap-2">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.startsAt.label")}</FormLabel>
                  <Input type="datetime-local" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.length.label")}</FormLabel>
                  <Input type="number" {...field} />
                </FormItem>
              )}
            />
            <Separator className="my-2" orientation="horizontal" />
            <FormField
              control={form.control}
              name="planningDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.planningMeeting.label")}</FormLabel>
                  <Input type="datetime-local" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.reviewMeeting.label")}</FormLabel>
                  <Input type="datetime-local" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retroDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.retroMeeting.label")}</FormLabel>
                  <Input type="datetime-local" {...field} />
                </FormItem>
              )}
            />
            <Separator className="my-2" orientation="horizontal" />
            <FormField
              control={form.control}
              name="tasksIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.tasks.label")}</FormLabel>
                  <Input />
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
