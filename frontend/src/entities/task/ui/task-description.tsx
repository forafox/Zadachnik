import { Extension } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";
import { Task, useUpdateTaskMutation } from "@/entities/task";
import { Button } from "@/shared/components/ui/button.tsx";
import { extensions } from "@/shared/components/ui/editor.tsx";
import { Separator } from "@/shared/components/ui/separator";
import { BlockquoteToolbar } from "@/shared/components/ui/toolbars/blockquote.tsx";
import { BoldToolbar } from "@/shared/components/ui/toolbars/bold";
import { BulletListToolbar } from "@/shared/components/ui/toolbars/bullet-list.tsx";
import { CodeBlockToolbar } from "@/shared/components/ui/toolbars/code-block.tsx";
import { CodeToolbar } from "@/shared/components/ui/toolbars/code.tsx";
import { HardBreakToolbar } from "@/shared/components/ui/toolbars/hard-break.tsx";
import { HorizontalRuleToolbar } from "@/shared/components/ui/toolbars/horizontal-rule.tsx";
import { ItalicToolbar } from "@/shared/components/ui/toolbars/italic.tsx";
import { OrderedListToolbar } from "@/shared/components/ui/toolbars/ordered-list.tsx";
import { RedoToolbar } from "@/shared/components/ui/toolbars/redo.tsx";
import { StrikeThroughToolbar } from "@/shared/components/ui/toolbars/strikethrough.tsx";
import { ToolbarProvider } from "@/shared/components/ui/toolbars/toolbar-provider.tsx";
import { cn } from "@/shared/lib/utils.ts";

export function TaskDescription({ task }: { task: Task }) {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content: task.description ?? "Add description",
    immediatelyRender: false,
  });
  const [isDirty, setIsDirty] = useState(false);

  const { mutate, isPending } = useUpdateTaskMutation();

  if (!editor) {
    return null;
  }

  function handleSave() {
    mutate(
      {
        ...task,
        description: editor?.getHTML(),
      },
      {
        onSuccess: () => {
          setIsDirty(false);
        },
      },
    );
  }

  return (
    <>
      <div className={cn("relative w-full overflow-hidden rounded-md")}>
        {isDirty && (
          <header
            className={cn(
              "sticky left-0 top-1 z-20 flex w-full items-center justify-between rounded border bg-background",
            )}
          >
            <ToolbarProvider editor={editor}>
              <div className="flex items-center gap-2">
                <RedoToolbar />
                <Separator orientation="vertical" className="h-7" />
                <BoldToolbar />
                <ItalicToolbar />
                <StrikeThroughToolbar />
                <BulletListToolbar />
                <OrderedListToolbar />
                <CodeToolbar />
                <CodeBlockToolbar />
                <HorizontalRuleToolbar />
                <BlockquoteToolbar />
                <HardBreakToolbar />
              </div>
            </ToolbarProvider>
          </header>
        )}
        <div
          onClick={() => {
            editor?.chain().focus().run();

            if (!isDirty) {
              setIsDirty(true);
            }
          }}
          className="cursor-text bg-background"
        >
          <EditorContent className="p-1 outline-none" editor={editor} />
        </div>
      </div>
      {isDirty && (
        <footer>
          <Button loading={isPending} onClick={handleSave}>
            Save
          </Button>
        </footer>
      )}
    </>
  );
}
