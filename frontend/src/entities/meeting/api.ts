import z from "zod";
import { meetingSchema } from "@/entities/meeting/model.ts";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  paginatedRequestSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const getTeamMeetingsQueryOptions = generateQueryOptions(
  meetingSchema.array(),
  paginatedRequestSchema.extend({ teamId: z.number() }),
  async ({ teamId, ...req }) => {
    const { data } = await api.api.getTeamMeetings(
      teamId,
      toBackendPagination(req),
    );
    return data;
  },
  ({ teamId, ...req }) => ["teams", teamId, "meetings", req],
);

export const createMeetingSchema = meetingSchema.omit({id: true})

export const useCreateTeamMeeting = generateMutation(
  createMeetingSchema,
  meetingSchema,
  // @ts-expect-error TODO fix it 🤡
  async ({ team, type, ...request }) => {
    const { data } = await api.api.createTeamMeeting(team.id, {
      // @ts-expect-error TODO fix it 🤡
      type: type.toUpperCase(),
      date: request.date.toISOString(),
      agenda: request.agenda,
    });

    return data;
  },
);
