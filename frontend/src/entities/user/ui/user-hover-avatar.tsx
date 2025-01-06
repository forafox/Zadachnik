import { User, UserHoverCardContent } from "@/entities/user";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar.tsx";
import {
  HoverCard,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card.tsx";
import { cn } from "@/shared/lib/utils.ts";

export function UserHoverAvatar({ user }: { user: User }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar user={user} />
      </HoverCardTrigger>
      <UserHoverCardContent user={user} />
    </HoverCard>
  );
}

export function UserAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  const avatarFallback = user.fullName
    .split(" ")
    .map((word) => word[0])
    .reduce((a, b) => a + b, "");
  return (
    <Avatar className={cn("overflow-clip", className)}>
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}
