import { useSuspenseQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { getPrincipalQueryOptions } from "@/entities/principal";
import {
  getTeamInvitationsQueryOptions,
  getTeamParticipantsQueryOptions,
  Team,
  useInviteDeveloperMutation,
} from "@/entities/team";
import { SelectUser, User, UserHoverCard } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog.tsx";
import { useDialog, useDialogOnClose } from "@/shared/hooks/use-dialog.tsx";

export function TeamParticipants({ team }: { team: Team }) {
  const {
    data: { values: participants },
  } = useSuspenseQuery(
    getTeamParticipantsQueryOptions({ teamId: team.id, page: 1, pageSize: 50 }),
  );
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);
  const { Dialog: InviteDialog } = useDialog();

  return (
    <section className="space-y-2">
      <header>
        <h4>Participants</h4>
      </header>
      <main>
        {participants.length == 0 && (
          <p className="text-muted-foreground">
            There are no developers in this team yet!
          </p>
        )}
        <ul>
          {participants.map((user) => (
            <li key={user.id}>
              <UserHoverCard user={user} />
            </li>
          ))}
        </ul>
      </main>
      {principal.id === team.scrumMaster.id && (
        <footer>
          <InviteDialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus />
                Invite
              </Button>
            </DialogTrigger>
            <InviteDeveloperDialogContent teamId={team.id} />
          </InviteDialog>
        </footer>
      )}
    </section>
  );
}

function InviteDeveloperDialogContent({ teamId }: { teamId: number }) {
  const onClose = useDialogOnClose();
  const [user, setUser] = useState<User | undefined>(undefined);
  const { mutate, isPending } = useInviteDeveloperMutation();

  const {
    data: { values: participants },
  } = useSuspenseQuery(
    getTeamParticipantsQueryOptions({ teamId, ...defaultPagination }),
  );

  const {
    data: { values: pending },
  } = useSuspenseQuery(
    getTeamInvitationsQueryOptions({
      teamId,
      ...defaultPagination,
      status: "PENDING",
    }),
  );

  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);

  function handleInvite() {
    if (user) {
      mutate(
        { teamId, userId: user.id },
        {
          onSuccess: onClose,
        },
      );
    }
  }

  function userFilter(user: User) {
    return !(
      participants.some((it) => it.id === user.id) ||
      user.id === principal.id ||
      pending.some((it) => it.user.id === user.id)
    );
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite a user</DialogTitle>
      </DialogHeader>
      <div>
        <SelectUser value={user} onChange={setUser} filter={userFilter} />
      </div>
      <DialogFooter>
        <Button
          onClick={handleInvite}
          disabled={user === undefined}
          loading={isPending}
        >
          Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
