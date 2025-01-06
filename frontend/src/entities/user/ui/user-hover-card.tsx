import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { useQuery } from "@tanstack/react-query";
/* eslint-disable */
import { forwardRef } from "react";
import { getPrincipalQueryOptions } from "@/entities/principal";
/* eslint-enable */
import { User } from "@/entities/user";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card.tsx";
import { cn } from "@/shared/lib/utils";
import { UserNameLink } from "@/entities/user/ui/user-name-link.tsx";

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

type CardProps = {
  user: User;
} & Omit<React.ComponentProps<typeof Button>, "children">;

export const UserHoverCard = forwardRef<HTMLButtonElement, CardProps>(
  function UserHoverCard({ user, ...props }, ref) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <UserNameLink username={user.username} {...props} />
        </HoverCardTrigger>
        <UserHoverCardContent user={user} />
      </HoverCard>
    );
  },
);
