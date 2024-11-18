import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { api, setAccessToken, setRefreshToken } from "@/shared/api";

export const signInRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Values = z.infer<typeof signInRequestSchema>;

export function useSignInMutation() {
  return useMutation({
    mutationFn: async (valuesRaw: Values) => {
      const values = signInRequestSchema.parse(valuesRaw);
      const { data } = await api.api.login(values);
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken)
    },
  });
}
