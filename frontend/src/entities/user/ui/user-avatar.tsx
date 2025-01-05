import { User, UserHoverCardContent } from "@/entities/user";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar.tsx";
import {
  HoverCard,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card.tsx";

export function UserAvatar({ user }: { user: User }) {
  const avatarFallback = user.fullName
    .split(" ")
    .map((word) => word[0])
    .reduce((a, b) => a + b, "");
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <UserHoverCardContent user={user} />
    </HoverCard>
  );
}
