import { useSuspenseQuery } from "@tanstack/react-query";
import { getTeamInvitationsQueryOptions, Team } from "@/entities/team";
import { UserHoverCard } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";

export function TeamPendingInvitations({ team }: { team: Team }) {
  const { data: invitations } = useSuspenseQuery(
    getTeamInvitationsQueryOptions({
      ...defaultPagination,
      teamId: team.id,
      status: "PENDING",
    }),
  );

  if (invitations.values.length == 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h4>Pending Invitations</h4>
      </header>
      <main>
        <ul>
          {invitations.values.map((invitation) => (
            <li key={invitation.id}>
              <UserHoverCard user={invitation.user} />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
