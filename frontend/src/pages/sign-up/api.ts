import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { api } from "@/shared/api";

export const signUpRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  fullName: z.string(),
});

type Values = z.infer<typeof signUpRequestSchema>;

export function useSignInMutation() {
  return useMutation({
    mutationFn: (valuesRaw: Values) => {
      const values = signUpRequestSchema.parse(valuesRaw);
      return api.api.register(values);
    },
  });
}
