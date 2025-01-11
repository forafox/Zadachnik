import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { invitationStatus, teamSchema } from "@/entities/team";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";
import { userSchema } from "../user";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  ticker: z.string(),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  owner: userSchema,
  // @TODO: remove .catch after backend implementation
  openIssues: z.number().catch(232),
  totalIssues: z.number().catch(421),
});

export type Product = z.infer<typeof productSchema>;

export const detailedProductSchema = productSchema.extend({});

export type DetailedProduct = z.infer<typeof detailedProductSchema>;

export const getProductsRequestSchema = paginatedRequestSchema;
export const getProductsResponseSchema = paginatedResponseSchema(productSchema);

export const getPrincipalProductsQueryOptions = (
  queryRaw: z.infer<typeof getProductsRequestSchema>,
) => {
  const query = getProductsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["products", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getProductsOfCurrentUser({
        size: query.pageSize,
        page: query.page - 1,
      });
      return getProductsResponseSchema.parse({
        page: data.pageable?.pageNumber,
        pageSize: data.pageable?.pageSize,
        total: data.totalElements,
        values: data.content,
      });
    },
  });
};

export const getProductByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const { data } = await api.api.getProductById(id);
      return detailedProductSchema.parse(data);
    },
  });

const productInvitationSchema = z.object({
  id: z.number(),
  product: productSchema,
  team: teamSchema,
  status: invitationStatus,
});

export const getProductInvitationsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(productInvitationSchema),
  paginatedRequestSchema.extend({
    productId: z.number(),
    status: invitationStatus.optional(),
  }),
  async ({ productId, status, ...req }) => {
    const { data } = await api.api.getAllProductInvitationsByProductId(
      productId,
      { ...toBackendPagination(req), status },
    );
    return fromBackendPagination(data);
  },
  ({ productId, ...req }) => ["products", productId, "invitations", req],
);

export const useInviteTeamToProductMutation = generateMutation(
  z.object({
    productId: z.number(),
    teamId: z.number(),
  }),
  productInvitationSchema,
  async ({ productId, teamId }) => {
    const { data } = await api.api.createProductInvitation(teamId, productId);
    return data;
  },
);

export const getProductParticipantsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(teamSchema),
  paginatedRequestSchema.extend({ productId: z.number() }),
  async ({ productId, ...req }) => {
    const { data } = await api.api.getProductTeams(
      productId,
      toBackendPagination(req),
    );

    return fromBackendPagination(data);
  },
  ({ productId, ...req }) => ["products", productId, "participants", req],
);
