import { z } from "zod";
import { userSchema } from "@/entities/user";

export const articleSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: userSchema,
});
