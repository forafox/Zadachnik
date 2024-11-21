import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  username: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});

export type User = z.infer<typeof userSchema>;
