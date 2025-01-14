import z from "zod";
import { articleSchema } from "@/entities/article";
import { commentSchema } from "@/entities/comment";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const getArticleQueryOptions = generateQueryOptions(
  articleSchema,
  z.object({ id: z.number() }),
  async ({ id }) => {
    const { data } = await api.api.getArticle(id);
    return data;
  },
  ({ id }) => ["articles", id],
);

export const useUpdateArticleMutation = generateMutation(
  articleSchema,
  articleSchema,
  async (article) => {
    const { data } = await api.api.updateArticle(article.id, {
      content: article.content,
    });
    return data;
  },
);

export const getArticleCommentsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(commentSchema),
  paginatedRequestSchema.extend({
    articleId: z.number(),
  }),
  async ({ articleId, ...req }) => {
    const { data } = await api.api.getArticleComments(
      articleId,
      toBackendPagination(req),
    );
    return fromBackendPagination(data);
  },
  ({ articleId, ...req }) => ["articles", articleId, "comments", req],
);

export const useCreateArticleComment = generateMutation(
  z.object({
    articleId: z.number(),
    content: z.string(),
  }),
  commentSchema,
  async ({ articleId, content }) => {
    const { data } = await api.api.createArticleComment(articleId, { content });
    return data;
  },
);
