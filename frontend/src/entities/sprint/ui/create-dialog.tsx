import { zodResolver } from "@hookform/resolvers/zod";
import { ru } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  createSprintRequestSchema,
  CreateSprintValues,
  useCreateSprintMutation,
} from "@/entities/sprint";
import { SelectTeamTasks } from "@/entities/task";
import { Button } from "@/shared/components/ui/button.tsx";
import { DateTimePicker } from "@/shared/components/ui/date-time-picker.tsx";
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
      tasks: [],
    },
  });
  const { t } = useTranslation("sprint");
  const { mutate, isPending, error } = useCreateSprintMutation();

  function handleSubmit(values: CreateSprintValues) {
    mutate(values, {
      onSuccess: ({ id }) => {
        onClose();
      },
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
                  <DateTimePicker modal {...field} />
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
                  <DateTimePicker modal {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.reviewMeeting.label")}</FormLabel>
                  <DateTimePicker modal {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retroDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.retroMeeting.label")}</FormLabel>
                  <DateTimePicker modal {...field} />
                </FormItem>
              )}
            />
            <Separator className="my-2" orientation="horizontal" />
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.tasks.label")}</FormLabel>
                  <SelectTeamTasks
                    teamId={teamId}
                    {...field}
                  />
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
