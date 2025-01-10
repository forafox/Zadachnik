import { z } from "zod";
import { userSchema } from "@/entities/user";

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: userSchema,
});

export type Comment = z.infer<typeof commentSchema>;
