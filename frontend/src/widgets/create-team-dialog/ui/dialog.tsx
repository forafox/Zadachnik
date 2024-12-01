import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import { useNavigateToTeam } from "@/entities/team";
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
import { createTeamRequest, useCreateTeamMutation } from "../api.ts";

type Values = z.infer<typeof createTeamRequest>;

export function CreateTeamDialogContent({ onClose }: { onClose: () => void }) {
  const form = useForm<Values>({
    resolver: zodResolver(createTeamRequest),
  });
  const { t } = useTranslation("team");
  const { mutate, isPending, error } = useCreateTeamMutation();
  const navigateToTeam = useNavigateToTeam();

  function handleSubmit(values: Values) {
    mutate(values, {
      onSuccess: ({ id }) => {
        navigateToTeam(id).then(onClose);
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.title.label")}</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-destructive">
                <CreationError />
              </p>
            )}
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

function CreationError() {
  const { t } = useTranslation("team");
  return t("feedback.genericError.label");
}
