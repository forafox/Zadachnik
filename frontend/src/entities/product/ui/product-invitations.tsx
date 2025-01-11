import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductInvitationsQueryOptions, Product } from "@/entities/product";
import { defaultPagination } from "@/shared/api/schemas.ts";

export function ProductInvitations({ product }: { product: Product }) {
  const {
    data: { values: pendingInvitations },
  } = useSuspenseQuery(
    getProductInvitationsQueryOptions({
      ...defaultPagination,
      productId: product.id,
      status: "PENDING",
    }),
  );

  if (pendingInvitations.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h3>Pending Invitations</h3>
      </header>
      <main>
        <ul>
          {pendingInvitations.map((invitation) => (
            <li key={invitation.id}>{invitation.team.title}</li>
          ))}
        </ul>
      </main>
    </section>
  );
}
