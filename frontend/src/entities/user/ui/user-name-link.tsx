import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react";
import { getPrincipalQueryOptions } from "@/entities/principal";
import { Button } from "@/shared/components/ui/button.tsx";
import { cn } from "@/shared/lib/utils.ts";

export const UserNameLink = forwardRef<
  HTMLButtonElement,
  { username: string } & React.ComponentProps<typeof Button>
>(function UserNameLink({ username, className, ...props }, ref) {
  const { data: principal } = useQuery(getPrincipalQueryOptions);

  const isCurrentUser = principal?.username === username;
  const buttonClassName = cn(
    "px-0 py-0 h-auto",
    {
      "bg-yellow-200/40": isCurrentUser,
    },
    className,
  );

  return (
    <Button className={buttonClassName} variant="link" {...props} ref={ref}>
      @{username}
    </Button>
  );
});
