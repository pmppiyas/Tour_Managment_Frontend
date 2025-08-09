import SocialLoginButtons from "@/components/modules/auth/SocialBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const LoginSchema = z.object({
  email: z.email("Input a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type TLoginValues = z.infer<typeof LoginSchema>;

export default function Login() {
  const form = useForm<TLoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TLoginValues) => {
    console.log(data);
  };
  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-center mb-6">Login Here</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login Now"}
          </Button>

          <SocialLoginButtons></SocialLoginButtons>

          <p className="text-lg text-center">
            You have no account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
