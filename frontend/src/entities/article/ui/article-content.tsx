import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Article, useUpdateArticleMutation } from "@/entities/article";
import { getPrincipalQueryOptions } from "@/entities/principal";
import { Button } from "@/shared/components/ui/button.tsx";
import { RichTextEditor } from "@/shared/components/ui/editor.tsx";

export function ArticleContent({ article }: { article: Article }) {
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);
  const [dirty, setDirty] = useState(false);
  const [value, setValue] = useState(article.content);
  const { mutate, isPending } = useUpdateArticleMutation();

  useEffect(() => {
    setValue(article.content);
  }, [article]);

  function handleSave() {
    mutate(
      { ...article, content: value },
      {
        onSuccess: () => {
          setDirty(false);
        },
      },
    );
  }

  return (
    <div className="space-y-2">
      <RichTextEditor
        value={value}
        onChange={setValue}
        editable={principal.id == article.author.id}
        setDirty={() => setDirty(true)}
        showHeader={dirty}
      />
      {dirty && (
        <Button loading={isPending} onClick={handleSave}>
          Save
        </Button>
      )}
    </div>
  );
}
