import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  getArticleCommentsQueryOptions,
  useCreateArticleComment,
} from "@/entities/article";
import { CommentItem } from "@/entities/comment";
import { Button } from "@/shared/components/ui/button.tsx";
import { Input } from "@/shared/components/ui/input.tsx";

export function ArticleComments({ articleId }: { articleId: number }) {
  const {
    data: { values: comments },
  } = useSuspenseQuery(
    getArticleCommentsQueryOptions({ articleId, page: 1, pageSize: 50 }),
  );
  const ref = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useCreateArticleComment();

  function onSend() {
    const value = ref.current?.value;
    if (value == undefined) {
      return;
    }

    mutate(
      {
        articleId,
        content: value,
      },
      {
        onSuccess: () => {
          // TODO: reset
        },
      },
    );
  }

  return (
    <div>
      <h2 className="font-bold">Comments</h2>
      <div className="space-y-2">
        {comments.values.length == 0 && (
          <p className="text-muted-foreground">No comments</p>
        )}
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <Input placeholder={"Leave a comment"} ref={ref} required />
        <div className="flex flex-row justify-end">
          <Button variant="outline" type="submit" size="sm" loading={isPending}>
            Sen
          </Button>
        </div>
      </form>
    </div>
  );
}
