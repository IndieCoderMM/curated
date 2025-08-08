"use client";

import { register } from "@/actions/register";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface RegisterFormProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const RegisterForm = ({
  heading = "Register",
  buttonText = "Register",
  signupText = "Already have an account?",
  signupUrl = "/login",
}: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data,
  ) => {
    startTransition(() => {
      register(data).then((result) => {
        if (result.success) {
          form.reset();
          toast.success("Account created successfully!");
        } else {
          toast.error(result.error ?? "Registration failed");
        }
      });
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 lg:justify-start">
      <Logo />
      <div className="flex w-full max-w-sm flex-col gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
        {heading && (
          <h1 className="text-center text-xl font-semibold">{heading}</h1>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Name"
                        className="text-sm"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="text-sm"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="text-sm"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className="text-sm"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                buttonText
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-center gap-1 text-sm text-muted-foreground">
        <p>{signupText}</p>
        <Link
          href={signupUrl}
          className="font-medium text-primary hover:underline"
        >
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
