import z from "zod";
import { meetingSchema } from "@/entities/meeting/model.ts";
import { api } from "@/shared/api";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const getTeamMeetingsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(meetingSchema),
  paginatedRequestSchema.extend({ teamId: z.number() }),
  async ({ teamId, ...req }) => {
    const { data } = await api.api.getTeamMeetings(
      teamId,
      toBackendPagination(req),
    );
    return fromBackendPagination(data);
  },
  ({ teamId, ...req }) => ["teams", teamId, "meetings", req],
);
