import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { teamSchema } from "@/entities/team";
import { api } from "@/shared/api";

export const createTeamRequest = z.object({
  title: z.string(),
});

export function useCreateTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (valuesRaw: z.infer<typeof createTeamRequest>) => {
      const values = createTeamRequest.parse(valuesRaw);
      const { data } = await api.api.createTeam({
        title: values.title,
      });
      return teamSchema.parse(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });
}
