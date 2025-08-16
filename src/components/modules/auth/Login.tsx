import { useState } from "react";
import SocialLoginButtons from "@/components/modules/auth/SocialBtn";
import { z } from "zod";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import {
  useLoginMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/auth.api";
import PasswordInput from "@/components/ui/passwordInput";
import type { IError } from "@/types";
import { useMe } from "@/hooks/useMe";

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

  const [IsVerified, setIsVerified] = useState(true);
  const [login] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation(undefined);
  const navigate = useNavigate();
  const { refetch } = useMe();
  const onSubmit = async (data: TLoginValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(userInfo).unwrap();
      refetch();
      toast.success("Login successfull.");
      navigate("/");
    } catch (err) {
      const error = err as IError;

      if (error.status === 404) {
        form.setError("password", {
          type: "manual",
          message: "Incorrect Password !!!",
        });
        toast.error("Incorrect password !!!");
        return;
      } else if (error.status === 420) {
        form.setError("email", {
          type: "manual",
          message: "User does not exist.",
        });
        toast.error("User does not exist.");
        return;
      } else if (error.status === 406) {
        setIsVerified(false);
        form.setError("email", {
          type: "manual",
          message: "User is not verified.",
        });
        toast.error("User is not verified.");
        return;
      }

      console.log(error);
      toast.error("Login failed.");
    }
  };

  const verifyClick = async (email: string) => {
    try {
      sendOtp({ email });
      navigate("/auth/verify", {
        state: email,
      });
      toast.success("Verify otp send successfully.");
    } catch (err: unknown) {
      toast.error("Verify otp send unsuccessfully.");
    }
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
                  <PasswordInput {...field}></PasswordInput>
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          {/* Submit Button */}
          {IsVerified ? (
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login Now"}
            </Button>
          ) : (
            <Button
              onClick={() => verifyClick(form.getValues("email"))}
              className="w-full"
              variant={"outline"}
              disabled={form.formState.isSubmitting}
            >
              Verify Now
            </Button>
          )}
        </form>
      </Form>
      <div className="space-y-2 mt-4">
        <SocialLoginButtons></SocialLoginButtons>

        <p className="text-lg text-center">
          You have no account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
