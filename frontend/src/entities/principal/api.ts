import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { invitationStatus, teamInvitationSchema } from "@/entities/team";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const principalSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  id: z.number(),
  role: z.enum(["ADMIN", "USER"]),
});

export const getPrincipalQueryOptions = queryOptions({
  queryKey: ["principal"],
  queryFn: async () => {
    const { data } = await api.api.me();
    return principalSchema.parse(data);
  },
});

export type Principal = z.infer<typeof principalSchema>;

export const getPrincipalTeamInvitations = generateQueryOptions(
  paginatedResponseSchema(teamInvitationSchema),
  paginatedRequestSchema,
  async (req) => {
    const { data } = await api.api.getAllTeamInvitationsForUser(
      toBackendPagination(req),
    );

    // @ts-expect-error bad typing
    return fromBackendPagination(data);
  },
  (req) => ["principal", "invitations", req],
);

export const useRespondToTeamInvitationMutation = generateMutation(
  z.object({
    teamId: z.number(),
    userId: z.number(),
    status: invitationStatus,
  }),
  teamInvitationSchema,
  async ({ teamId, userId, status }) => {
    const { data } = await api.api.updateTeamInvitation(teamId, userId, {
      status,
    });
    return data;
  },
);
