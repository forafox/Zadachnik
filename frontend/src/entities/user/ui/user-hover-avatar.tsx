import { User, UserHoverCardContent } from "@/entities/user";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar.tsx";
import {
  HoverCard,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card.tsx";
import { cn } from "@/shared/lib/utils.ts";

export function UserHoverAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar className={className} user={user} />
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
  props?: string;
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
