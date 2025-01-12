import z from "zod";
import { teamSchema } from "@/entities/team";

export const meetingType = z.enum([
  "daily",
  "planning",
  "review",
  "retrospective",
]);

export const meetingSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  agenda: z.string(),
  team: teamSchema,
  type: z.string().toLowerCase().pipe(meetingType),
});
export type Meeting = z.infer<typeof meetingSchema>;
