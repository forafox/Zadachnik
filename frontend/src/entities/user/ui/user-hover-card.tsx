import { User } from "@/entities/user";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card.tsx";

export function UserHoverCardContent({ user }: { user: User }) {
  const userAvatarFallback = user.fullName
    .split(" ")
    .map((it) => it[0])
    .reduce((a, b) => a + b, "");

  return (
    <HoverCardContent>
      <div className="flex space-x-4">
        <Avatar>
          <AvatarFallback>{userAvatarFallback}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="my-0 text-sm font-semibold">{user.fullName}</h4>
          <p className="text-sm">@{user.username}</p>
        </div>
      </div>
    </HoverCardContent>
  );
}

export function UserHoverCard({ user }: { user: User }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="px-0" variant="link">@{user.username}</Button>
      </HoverCardTrigger>
      <UserHoverCardContent user={user} />
    </HoverCard>
  );
}
