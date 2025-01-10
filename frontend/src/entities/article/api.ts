import { articleSchema } from "@/entities/article/model.ts";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";

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
