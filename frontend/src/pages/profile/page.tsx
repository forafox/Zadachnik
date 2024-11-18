import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getPrincipalQueryOptions, Principal } from "@/entities/principal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Label } from "@/shared/components/ui/label.tsx";

export function ProfilePage({ principal }: { principal: Principal }) {
  const { data } = useQuery({
    ...getPrincipalQueryOptions,
    initialData: principal,
  });
  const { t } = useTranslation("principal");

  return (
    <Card className="mx-auto mt-8 w-full max-w-screen-xl">
      <CardHeader>
        <CardTitle>{t("profilePage.title")}</CardTitle>
        <CardDescription>{t("profilePage.description")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 [&>*]:grid [&>*]:gap-2">
        <div>
          <Label>{t("items.fullName.label")}</Label>
          <Input disabled value={data.fullName} />
        </div>
        <div>
          <Label>{t("items.username.label")}</Label>
          <Input disabled value={data.username} />
        </div>
      </CardContent>
    </Card>
  );
}
