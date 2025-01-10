import { Link } from "@tanstack/react-router";
import { Release } from "@/entities/release";

export function ReleaseLink({ release }: { release: Release }) {
  return (
    <Link
      to="/products/$productId/releases/$releaseId"
      params={{
        releaseId: String(release.id),
        productId: String(release.product.id),
      }}
    >
      {release.version}
    </Link>
  );
}
