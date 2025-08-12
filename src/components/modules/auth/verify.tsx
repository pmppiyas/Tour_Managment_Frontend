import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation(undefined);
  const [email] = useState(location.state);

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // });

  const otpSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  type TOTP = z.infer<typeof otpSchema>;

  const form = useForm<TOTP>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async ({ otp }: TOTP) => {
    try {
      const payload = {
        otp,
        email,
      };

      const result = await verifyOtp(payload).unwrap();

      if (result.success) {
        navigate("/auth/login");
        toast.success("Verification successfull.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResendOtp = async () => {};
  return (
    <div className="w-full mx-auto max-w-md bg-background/80 border  rounded-xl shadow-lg my-8 px-2 py-4 md:p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center ">
        🔐 OTP Verification
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="flex justify-center gap-2 mt-2"
                  >
                    <InputOTPGroup className="mx-auto space-x-2">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-12 text-xl text-center border  rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-sm text-gray-500 mt-2">
                  Please enter the 6-digit code sent to your phone or email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/90 transition rounded-md py-2"
          >
            Verify OTP
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-500">
        Didn't receive the code?{" "}
        <button
          type="button"
          className="text-primary hover:underline font-medium"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>
      </p>
    </div>
  );
}
