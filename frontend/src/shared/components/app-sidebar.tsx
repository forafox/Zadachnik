import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/shared/components/ui/sidebar.tsx";

type Props = {
  principalSlot?: React.ReactNode;
  productsSlot?: React.ReactNode;
  teamsSlot?: React.ReactNode;
};

export function AppSidebar({ principalSlot, productsSlot, teamsSlot }: Props) {
  return (
    <Sidebar data-testid="sidebar">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="font-mono text-2xl font-bold leading-none"
        >
          Zadachnik
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {teamsSlot}
        <SidebarSeparator />
        {productsSlot}
      </SidebarContent>
      <SidebarFooter className="gap-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>
              <span className="size-4 bg-yellow-300" />
              You've got a meeting!
            </CardTitle>
            <CardDescription>
              You have a daily meeting with "Three Baristas" team in 5 minutes
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Join</Button>
          </CardFooter>
        </Card>
        {principalSlot}
      </SidebarFooter>
    </Sidebar>
  );
}
