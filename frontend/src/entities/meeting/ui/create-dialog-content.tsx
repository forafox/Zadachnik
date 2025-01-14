import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createMeetingSchema, useCreateTeamMeeting } from "@/entities/meeting";
import { Team } from "@/entities/team";
import { Button } from "@/shared/components/ui/button.tsx";
import { DateTimePicker } from "@/shared/components/ui/date-time-picker.tsx";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog.tsx";
import { Form, FormField } from "@/shared/components/ui/form.tsx";
import { useDialogOnClose } from "@/shared/hooks/use-dialog.tsx";

export function CreateMeetingDialogContent({ team }: { team: Team }) {
  const onClose = useDialogOnClose();
  const { mutate, isPending } = useCreateTeamMeeting();
  const form = useForm<z.infer<typeof createMeetingSchema>>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      team,
      agenda: "",
      type: "daily",
    },
  });

  function createMeeting(meeting: z.infer<typeof createMeetingSchema>) {
    mutate(meeting, {
      onSuccess: onClose,
    });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createMeeting)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Create a Daily Meeting</DialogTitle>
          </DialogHeader>
          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => <DateTimePicker modal {...field} />}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" loading={isPending} type="submit">
              <PlusCircle />
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
