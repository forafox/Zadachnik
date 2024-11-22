import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useNavigateToProduct() {
  const navigate = useNavigate();
  return useCallback(
    (id: number) => {
      return navigate({
        to: "/products/$productId",
        params: {
          productId: String(id),
        },
      });
    },
    [navigate],
  );
}
