"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { handleSignUp } from "@/app/action";

export const signUpSchema = z
  .object({
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

    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSignUp = async (values: SignUpType) => {
    await handleSignUp(values);
  };

  const firstError = Object.entries(form.formState.errors)[0];
  const firstErrorMessage = firstError
    ? `${firstError[0]} ${firstError[1].message?.toLowerCase()}`
    : null;

  return (
    <section className="w-[23.4375rem] flex flex-col items-center self-center md:w-[29.75rem]  md:gap-y-[3.1875rem]">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={184} height={40} />
      </Link>
      <div className="flex flex-col bg-white w-full rounded-lg p-4  md:p-10 md:gap-10">
        <div className="gap-2">
          <h3 className="text-[2rem] font-bold">Create account</h3>
          <p className="text-base font-normal text-[#888888]">
            Let&apos;s get you started sharing your links!
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-normal">
                    Confirm password
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
            {firstErrorMessage && (
              <FormMessage className="text-[#888888]">
                {firstErrorMessage}
              </FormMessage>
            )}
            <Button type="submit" className="w-full">
              Submit
            </Button>

            <p className="text-center text-[#737373] space-x-1">
              <span>Already have an account?</span>
              <Link href="/" className="text-primary">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
