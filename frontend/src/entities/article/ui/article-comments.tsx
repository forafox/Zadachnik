import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  getArticleCommentsQueryOptions,
  useCreateArticleComment,
} from "@/entities/article";
import { CommentItem } from "@/entities/comment";
import { Button } from "@/shared/components/ui/button.tsx";
import { Textarea } from "@/shared/components/ui/textarea.tsx";

export function ArticleComments({ articleId }: { articleId: number }) {
  const {
    data: { values: comments },
  } = useSuspenseQuery(
    getArticleCommentsQueryOptions({ articleId, page: 1, pageSize: 50 }),
  );
  const ref = useRef<HTMLTextAreaElement | null>(null);

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
    <section className="space-y-6">
      <main className="space-y-2">
        <h2 className="font-bold">Comments</h2>
        <div className="space-y-2">
          {comments.length == 0 && (
            <p className="text-muted-foreground">No comments</p>
          )}
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      </main>
      <form
        className="mt-4 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <Textarea placeholder={"Leave a comment"} ref={ref} required />
        <div className="flex flex-row justify-end">
          <Button variant="outline" type="submit" size="sm" loading={isPending}>
            Send
          </Button>
        </div>
      </form>
    </section>
  );
}
