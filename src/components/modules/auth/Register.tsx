import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import SocialLoginButtons from "@/components/modules/auth/SocialBtn";
import PasswordInput from "@/components/ui/passwordInput";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name is too short, Minimum 2 charecters long" })
      .max(50, { message: "Name is too long, Max 50 charecter long" }),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Password must include uppercase, lowercase, and a special character.",
      }),
    comfirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Password must include uppercase, lowercase, and a special character.",
      }),
  })
  .refine((data) => data.password === data.comfirmPassword, {
    message: "Password don't match",
    path: ["comfirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    const userInfo = {
      name: data.fullName,
      email: data.email,
      password: data.password,
    };
    console.log(userInfo);
    try {
      const result = await register(userInfo);
      console.log(result);
      toast.success("User created successfully.");
      navigate("/auth/verify");
    } catch (error) {
      console.log(error);
      toast.error("User create unsuccessfull.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-center mb-6">Register Here</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          {/* Email */}
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

          {/* Password */}
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

          {/* Re Password */}
          <FormField
            control={form.control}
            name="comfirmPassword"
            render={({ field }) => (
              <>
                <FormLabel>Comfirm password</FormLabel>
                <FormControl>
                  <PasswordInput {...field}></PasswordInput>
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
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
      <div className="space-y-2 mt-4">
        <SocialLoginButtons></SocialLoginButtons>

        <p className="text-lg text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
