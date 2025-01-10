import { UserAvatar } from "@/entities/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Comment } from "../model";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex flex-row items-center space-x-2 font-normal">
          <UserAvatar
            user={comment.author}
            className="size-8 text-sm font-light"
          />
          <span>{comment.author.fullName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">{comment.content}</CardContent>
    </Card>
  );
}
