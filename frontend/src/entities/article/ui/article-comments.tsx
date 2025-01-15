import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  createArticleRequestSchema,
  getArticleCommentsQueryOptions,
  useCreateArticleComment,
} from "@/entities/article";
import { CommentItem } from "@/entities/comment";
import { Button } from "@/shared/components/ui/button.tsx";
import { Form, FormField } from "@/shared/components/ui/form.tsx";
import { Textarea } from "@/shared/components/ui/textarea.tsx";

export function ArticleComments({ articleId }: { articleId: number }) {
  const {
    data: { values: comments },
  } = useSuspenseQuery(
    getArticleCommentsQueryOptions({ articleId, page: 1, pageSize: 50 }),
  );

  return (
    <section className="w-full space-y-6">
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
      <SendComment articleId={articleId} />
    </section>
  );
}

function SendComment({ articleId }: { articleId: number }) {
  const { mutate, isPending } = useCreateArticleComment();
  const form = useForm<z.infer<typeof createArticleRequestSchema>>({
    resolver: zodResolver(createArticleRequestSchema),
    defaultValues: {
      articleId,
      content: "",
    },
  });

  function onSend(values: z.infer<typeof createArticleRequestSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form className="mt-4 space-y-2" onSubmit={form.handleSubmit(onSend)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <Textarea placeholder={"Leave a comment"} required {...field} />
          )}
        />
        <div className="flex flex-row justify-end">
          <Button variant="outline" type="submit" size="sm" loading={isPending}>
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
