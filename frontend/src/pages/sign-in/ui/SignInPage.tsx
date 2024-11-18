import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { signInRequestSchema, useSignInMutation } from "../api";

const schema = signInRequestSchema;

export function SignInPage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending, error } = useSignInMutation();

  function handleSubmit(values: z.infer<typeof schema>) {
    mutate(values);
  }

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials below to enter the system
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 [&>*]:grid [&>*]:gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            {error && <SignInError />}
          </CardContent>
          <CardFooter className="grid gap-4">
            <Button type="submit" loading={isPending} className="w-full">
              Sign In
            </Button>
            <span className="text-center">
              Don't have an account?
              <Button variant="link">Sign Up</Button>
            </span>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
function SignInError() {
  return <p className="text-destructive">An error has occurred!</p>;
}
