import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, XIcon } from "lucide-react";
import { getPrincipalQueryOptions } from "@/entities/principal";
import {
  getTeamProductInvitations,
  ProductInvitation,
  useRespondToProductInvitationMutation,
} from "@/entities/product";
import { Team } from "@/entities/team";
import { UserHoverCard } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { Button } from "@/shared/components/ui/button.tsx";

export function TeamProductsInvitations({ team }: { team: Team }) {
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);

  const {
    data: { values: invitations },
  } = useSuspenseQuery(
    getTeamProductInvitations({
      ...defaultPagination,
      teamId: team.id,
      status: "PENDING",
    }),
  );

  const { mutate, isPending } = useRespondToProductInvitationMutation();

  function handleAccept(invitation: ProductInvitation) {
    mutate({
      teamId: invitation.team.id,
      productId: invitation.product.id,
      status: "ACCEPTED",
    });
  }

  function handleReject(invitation: ProductInvitation) {
    mutate({
      teamId: invitation.team.id,
      productId: invitation.product.id,
      status: "REJECTED",
    });
  }

  if (invitations.length === 0 || principal.id != team.scrumMaster.id) {
    return null;
  }

  return (
    <section>
      <header>
        <h4>Invitations to Products</h4>
      </header>
      <main>
        <ul>
          {invitations.map((invitation) => (
            <li
              key={invitation.id}
              className="flex flex-row items-center justify-between"
            >
              <div>
                &laquo;{invitation.product.title}&raquo; owned by{" "}
                <UserHoverCard user={invitation.product.owner} />
              </div>
              <div className="flex space-x-2">
                <Button
                  className="size-8"
                  variant="default"
                  onClick={() => handleAccept(invitation)}
                  disabled={isPending}
                >
                  <CheckIcon />
                </Button>
                <Button
                  className="size-8"
                  variant="destructive"
                  onClick={() => handleReject(invitation)}
                  disabled={isPending}
                >
                  <XIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
