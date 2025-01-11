import { useSuspenseQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { getPrincipalQueryOptions } from "@/entities/principal";
import {
  getProductInvitationsQueryOptions,
  getProductParticipantsQueryOptions,
  Product,
  useInviteTeamToProductMutation,
} from "@/entities/product";
import { Team } from "@/entities/team";
import { SelectTeam } from "@/entities/team";
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

export function ProductParticipants({ product }: { product: Product }) {
  const {
    data: { values: participants },
  } = useSuspenseQuery(
    getProductParticipantsQueryOptions({
      productId: product.id,
      ...defaultPagination,
    }),
  );
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);
  const { Dialog: InviteDialog } = useDialog();

  return (
    <section>
      <header>
        <h4>Participants</h4>
      </header>
      <main>
        {participants.length == 0 && (
          <p className="text-muted-foreground">
            This product has no participants yet
          </p>
        )}
        {participants.length > 0 && (
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>{participant.title}</li>
            ))}
          </ul>
        )}
      </main>
      {principal.id === product.owner.id && (
        <footer>
          <InviteDialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <CirclePlus />
                Invite
              </Button>
            </DialogTrigger>
            <InviteDialogContent product={product} />
          </InviteDialog>
        </footer>
      )}
    </section>
  );
}

function InviteDialogContent({ product }: { product: Product }) {
  const { mutate, isPending } = useInviteTeamToProductMutation();
  const onClose = useDialogOnClose();
  const [team, setTeam] = useState<Team | undefined>(undefined);

  const {
    data: { values: participants },
  } = useSuspenseQuery(
    getProductParticipantsQueryOptions({
      productId: product.id,
      ...defaultPagination,
    }),
  );

  const {
    data: { values: pendingInvitations },
  } = useSuspenseQuery(
    getProductInvitationsQueryOptions({
      ...defaultPagination,
      productId: product.id,
      status: "PENDING",
    }),
  );

  function handleInvite() {
    if (team) {
      mutate(
        { productId: product.id, teamId: team.id },
        {
          onSuccess: onClose,
        },
      );
    }
  }

  function teamFilter(team: Team) {
    return !(
      pendingInvitations.some((it) => it.id === team.id) ||
      participants.some((it) => it.id === team.id)
    );
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite a Team</DialogTitle>
      </DialogHeader>
      <div>
        <SelectTeam value={team} onChange={setTeam} filter={teamFilter} />
      </div>
      <DialogFooter>
        <Button
          disabled={team === undefined}
          onClick={handleInvite}
          loading={isPending}
        >
          Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
