import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import { createProductRequest } from "@/widgets/create-product-dialog/api.ts";
import { useNavigateToProduct } from "@/entities/product";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog.tsx";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Textarea } from "@/shared/components/ui/textarea.tsx";
import { useCreateProductMutation } from "../api.ts";

type Values = z.infer<typeof createProductRequest>;

export function CreateProductDialogContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const form = useForm<Values>({
    resolver: zodResolver(createProductRequest),
  });
  const { t } = useTranslation("product");
  const { mutate, isPending, error } = useCreateProductMutation();
  const navigateToProduct = useNavigateToProduct();

  function handleSubmit(values: Values) {
    mutate(values, {
      onSuccess: ({ id }) => {
        navigateToProduct(id).then(onClose);
      },
    });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("create.label")}</DialogTitle>
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
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.ticker.label")}</FormLabel>
                  <FormDescription>
                    {t("items.ticker.description")}
                  </FormDescription>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("items.description.label")}</FormLabel>
                  <Textarea {...field} />
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
              {t("create.actions.create.label")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

function CreationError() {
  const { t } = useTranslation("product");
  return t("feedback.genericError.label");
}
