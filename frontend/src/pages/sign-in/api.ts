import { api } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import z from "zod"

export const signInRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

type Values = z.infer<typeof signInRequestSchema>

export function useSignInMutation() {
  return useMutation({
    mutationFn: (valuesRaw: Values) => {
      const values = signInRequestSchema.parse(valuesRaw);
      return api.api.login(values)
    }
  })
}
