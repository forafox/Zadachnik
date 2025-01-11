import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas";
import { userSchema } from "../user";

export const teamSchema = z.object({
  id: z.number(),
  title: z.string(),
  scrumMaster: userSchema,
});

export type Team = z.infer<typeof teamSchema>;

export const getTeamsRequestSchema = paginatedRequestSchema;
export const getTeamsResponseSchema = paginatedResponseSchema(teamSchema);

export const getPrincipalTeamsQueryOptions = (
  queryRaw: z.infer<typeof getTeamsRequestSchema>,
) => {
  const query = getTeamsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["teams", "list_principal", query],
    queryFn: async () => {
      const { data } = await api.api.getTeamsOfCurrentUser({
        size: query.pageSize,
        page: query.page - 1,
      });
      return getTeamsResponseSchema.parse({
        page: data.pageable?.pageNumber,
        pageSize: data.pageable?.pageSize,
        total: data.totalElements,
        values: data.content,
      });
    },
  });
};

export const getTeamsQueryOptions = (
  queryRaw: z.infer<typeof getTeamsRequestSchema>,
) => {
  const query = getTeamsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["teams", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getTeams(toBackendPagination(query));
      return getTeamsResponseSchema.parse(fromBackendPagination(data));
    },
  });
};

export const getTeamQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["teams", "detail", id],
    queryFn: async () => {
      const { data } = await api.api.getTeamById(id);
      return teamSchema.parse(data);
    },
  });
};

export const getTeamParticipantsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(userSchema),
  paginatedRequestSchema.extend({ teamId: z.number() }),
  async ({ teamId, ...req }) => {
    const { data } = await api.api.getUsersOfTeams(
      teamId,
      toBackendPagination(req),
    );
    return fromBackendPagination(data);
  },
  ({ teamId, ...req }) => ["teams", teamId, "participants", req],
);

export const invitationStatus = z.enum(["PENDING", "ACCEPTED", "REJECTED"]);

export const teamInvitationSchema = z.object({
  id: z.number(),
  team: teamSchema,
  user: userSchema,
  status: invitationStatus,
});

export type TeamInvitation = z.infer<typeof teamInvitationSchema>;

export const getTeamInvitationsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(teamInvitationSchema),
  paginatedRequestSchema.extend({
    teamId: z.number(),
    status: invitationStatus.optional(),
  }),
  async ({ teamId, status, ...req }) => {
    const { data } = await api.api.getAllTeamInvitationByTeamId(teamId, {
      ...toBackendPagination(req),
      status,
    });

    return fromBackendPagination(data);
  },
  ({ teamId, ...req }) => ["teams", teamId, "invitations", req],
);

export const useInviteDeveloperMutation = generateMutation(
  z.object({ teamId: z.number(), userId: z.number() }),
  z.void(),
  async ({ teamId, userId }) => {
    await api.api.createTeamInvitation(teamId, userId);

    return;
  },
);

export const getPrincipalTeamInvitations = generateQueryOptions(
  paginatedResponseSchema(teamInvitationSchema),
  paginatedRequestSchema,
  async (req) => {
    const { data } = await api.api.getAllTeamInvitationsForUser(
      toBackendPagination(req),
    );

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
