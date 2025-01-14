import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  ArticleComments,
  ArticleContent,
  getArticleQueryOptions,
} from "@/entities/article";
import { UserHoverCard } from "@/entities/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";

export const Route = createFileRoute("/_authenticated/articles/$articleId")({
  component: RouteComponent,
});

function RouteComponent() {
  const articleId = parseInt(Route.useParams().articleId);
  const { data: article } = useSuspenseQuery(
    getArticleQueryOptions({ id: articleId }),
  );

  return (
    <Card>
      <CardHeader>
        <div>
          Author: <UserHoverCard user={article.author} />
        </div>
      </CardHeader>
      <CardContent>
        <ArticleContent article={article} />
      </CardContent>
      <CardFooter className="w-full">
        <ArticleComments articleId={articleId} />
      </CardFooter>
    </Card>
  );
}
