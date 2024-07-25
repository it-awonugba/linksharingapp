"use client";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { LinkType } from "./LinkFormSection";

type AddFormProperties = {
  link?: LinkType;
};

export default function AddForm({ link }: AddFormProperties) {
  const form = useForm({
    defaultValues: {
      ...link,
    },
  });
  const saveForm = () => {};

  return (
    <div className="flex flex-col w-full justify-center items-center bg-[#fafafa] p-10 gap-10 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveForm)} className="space-y-3">
          <FormField
            control={form.control}
            name="platform"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-normal">Platform</FormLabel>
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
            name="link"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-normal">Link</FormLabel>
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
        </form>
      </Form>
    </div>
  );
}
