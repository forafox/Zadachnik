import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { api, setAccessToken, setRefreshToken } from "@/shared/api";

export const signUpRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  fullName: z.string(),
});

type Values = z.infer<typeof signUpRequestSchema>;

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async (valuesRaw: Values) => {
      const values = signUpRequestSchema.parse(valuesRaw);
      const { data } = await api.api.register(values);

      return data;
    },
    onSuccess: (tokens) => {
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    },
  });
}
