import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addDays } from "date-fns";
import { useTranslation } from "react-i18next";
import { getReleaseByIdQueryOptions } from "@/entities/release";
import { TaskStatusBadge, TaskTypeBadge } from "@/entities/task";
import { UserHoverAvatar } from "@/entities/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { DateTime } from "@/shared/components/ui/date-time.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/releases/$releaseId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const productId = parseInt(Route.useParams().productId);
  const releaseId = parseInt(Route.useParams().releaseId);
  const { data: release } = useSuspenseQuery(
    getReleaseByIdQueryOptions({ productId, releaseId }),
  );
  const { t } = useTranslation("release");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{release.version}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 [&>div]:space-y-2">
        <div>
          <h3 className="font-medium">{t("items.releaseNotes.label")}</h3>
          <div>@TODO: article editor component</div>
        </div>
        <div>
          <h3 className="font-medium">{t("items.tasks.label")}</h3>
          <ul>
            {release.tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-row items-center space-x-2"
              >
                <TaskTypeBadge type={task.type} />{" "}
                <TaskStatusBadge status={task.status} />
                {task.assignee && (
                  <UserHoverAvatar
                    className="size-6 text-xs font-light"
                    user={task.assignee}
                  />
                )}
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">{t("items.sprint.label")}</h3>
          <span>
            <DateTime value={release.sprint.startAt} showTime={false} /> &mdash;{" "}
            <DateTime
              value={addDays(release.sprint.startAt, release.sprint.length)}
              showTime={false}
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
