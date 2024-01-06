"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import useUploadFile from "@/hooks/useUploadFile";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createCommunity } from "@/lib/actions/community.action";
import { toast } from "../ui/use-toast";

const createCommunitiesSchema = z.object({
  name: z.string().min(4, "Name must greater than 4 characters"),
  description: z
    .string()
    .min(10, "The description must greater than 100 characters"),
  logo: z.string(),
});

export default function CreateCommunitiesForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createCommunitiesSchema>>({
    resolver: zodResolver(createCommunitiesSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });
  const { handleChange, preview } = useUploadFile(form);

  async function onSubmit(data: z.infer<typeof createCommunitiesSchema>) {
    const { description, logo, name } = data;
    try {
      setIsLoading(true);
      await createCommunity({ description, logo, name });
      toast({
        title: "Success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[500px] space-y-5 p-5"
      >
        <FormField
          control={form.control}
          name="logo"
          render={() => (
            <FormItem>
              <FormLabel
                htmlFor="profile"
                className=" flex w-max items-center gap-5"
              >
                <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-[#2C353D]">
                  {preview?.logo ? (
                    <Image
                      className="rounded-full object-cover object-center"
                      fill
                      src={preview.logo}
                      alt="profile Image"
                    />
                  ) : (
                    <Image
                      width={25}
                      height={25}
                      src={"/assets/image.svg"}
                      alt="image icon"
                    />
                  )}
                </div>
                <span className="cursor-pointer text-base text-white">
                  Set Logo
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  id="profile"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  placeholder="set profile"
                  onChange={(e) => handleChange(e, "logo")}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Community name"
                  className="focus:ring-none !ring-none w-full flex-1 !border-none bg-main focus:border-none focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Community description"
                  cols={30}
                  rows={10}
                  className="focus:ring-none !ring-none w-full flex-1 !border-none bg-main focus:border-none focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          aria-disabled={isLoading}
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-500/50"
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
