import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function SignInPage() {
  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials below to enter the system
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 [&>*]:grid [&>*]:gap-2">
        <div>
          <Label>Username</Label>
          <Input />
        </div>
        <div>
          <Label>Password</Label>
          <Input />
        </div>
      </CardContent>
      <CardFooter className="grid gap-4">
        <Button className="w-full">Sign In</Button>
        <span className="text-center">
          Don't have an account?
          <Button variant="link">Sign Up</Button>
        </span>
      </CardFooter>
    </Card>
  );
}
