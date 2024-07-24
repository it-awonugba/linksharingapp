"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/app/action";
import Link from "next/link";

export const loginFormSchema = z.object({
  username: z
    .string({ message: "Can't be empty" })
    .email({ message: "Must be valid email" }),
  password: z
    .string()
    .min(8, { message: "8 characters minimum" })
    .regex(/[A-Z]/, {
      message: "Contain one uppercase",
    })
    .regex(/[a-z]/, {
      message: "Contain one lowercase",
    })
    .regex(/\d/, { message: "Contain one digit" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });
  async function onLogin(data: LoginFormType) {
    await handleLogin(data);
  }

  return (
    <section className="w-[23.4375rem] flex-col md:w-[29.75rem] flex flex-col items-center self-center gap-y-[3.1875rem]">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={184} height={40} />
      </Link>
      <div className="flex flex-col w-full bg-white rounded-lg p-4  md:p-10 md:gap-10">
        <div className="gap-2">
          <h3 className="text-[2rem] font-bold">Login</h3>
          <p className="text-base font-normal text-[#888888]">
            Add your details below to get back into the app
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-normal">
                    Username
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500">
                        <Image
                          src="/images/ph_envelope-simple-fill.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />
                      </span>
                      <Input
                        className={`pl-10 ${
                          fieldState.error ? "border-red-500 pr-32" : ""
                        } focus:outline-none`}
                        placeholder="e.g. isaac@email.com"
                        {...field}
                      />
                      {fieldState.error && (
                        <FormDescription className="absolute right-3 text-red-500 text-xs">
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-normal">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500">
                        <Image
                          src="/images/ph_lock-key-fill.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />
                      </span>
                      <Input
                        type="password"
                        className={`pl-10 ${
                          fieldState.error ? "border-red-500 pr-32" : ""
                        }`}
                        placeholder="Enter your password"
                        {...field}
                      />
                      {fieldState.error && (
                        <FormDescription className="absolute right-3 text-red-500 text-xs">
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>

            <p className="text-base font-normal space-x-1 text-[#888888]">
              <span>Don’t have an account?</span>
              <Link href="/signup" className="text-primary">
                Create account
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
