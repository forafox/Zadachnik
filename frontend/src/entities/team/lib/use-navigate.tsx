import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useNavigateToTeam() {
  const navigate = useNavigate();
  return useCallback(
    (id: number) => {
      return navigate({
        to: "/teams/$teamId",
        params: {
          teamId: String(id),
        },
      });
    },
    [navigate],
  );
}
