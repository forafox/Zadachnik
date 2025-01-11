import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  getPrincipalQueryOptions,
  getPrincipalTeamInvitations,
  useRespondToTeamInvitationMutation,
} from "@/entities/principal";
import { TeamInvitation } from "@/entities/team";
import { UserHoverCard } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Input } from "@/shared/components/ui/input.tsx";
import { Label } from "@/shared/components/ui/label.tsx";

export const Route = createFileRoute("/_authenticated/me/")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.prefetchQuery(getPrincipalQueryOptions),
});

function RouteComponent() {
  const { data } = useSuspenseQuery(getPrincipalQueryOptions);
  const { t } = useTranslation("principal");

  return (
    <>
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
      <PrincipalInvitations />
    </>
  );
}

function PrincipalInvitations() {
  const { data: invitations } = useSuspenseQuery(
    getPrincipalTeamInvitations(defaultPagination),
  );
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);
  const { mutate, isPending } = useRespondToTeamInvitationMutation();

  function handleAccept(invitation: TeamInvitation) {
    mutate({
      teamId: invitation.team.id,
      userId: principal.id,
      status: "ACCEPTED",
    });
  }

  function handleReject(invitation: TeamInvitation) {
    mutate({
      teamId: invitation.team.id,
      userId: principal.id,
      status: "REJECTED",
    });
  }

  const pendingInvitations = invitations.values.filter(
    (it) => it.status === "PENDING",
  );

  if (pendingInvitations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {pendingInvitations.map((invitation) => (
            <li
              key={invitation.id}
              className="flex flex-row items-center justify-between"
            >
              <div>
                &laquo;{invitation.team.title}&raquo; led by{" "}
                <UserHoverCard user={invitation.team.scrumMaster} />
              </div>
              <div className="flex flex-row space-x-2">
                <Button
                  variant="default"
                  size="icon"
                  className="size-8"
                  onClick={() => handleAccept(invitation)}
                  loading={isPending}
                >
                  <CheckIcon />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="size-8"
                  onClick={() => handleReject(invitation)}
                  loading={isPending}
                >
                  <XIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
