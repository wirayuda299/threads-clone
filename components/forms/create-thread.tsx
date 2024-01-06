"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createThread } from "@/lib/actions/thread.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  caption: z.string().min(1, "Please add caption"),
});

type ThreadProps = {
  communityId?: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function ThreadForm({ communityId, setIsOpen }: ThreadProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { caption: "" },
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setPending(true);
      await createThread(
        data.caption,
        "thread",
        window.location.pathname,
        undefined,
        communityId && communityId
      );
      if (communityId) {
        router.push(`/communities/${communityId}`);
      }
      if (!communityId) {
        router.push("/");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: e.message,
          variant: "destructive",
        });
      }
    } finally {
      setPending(false);
      setIsOpen ? setIsOpen(false) : console.log("Finish");
    }
  };

  return (
    <section className="no-scrollbar h-full w-full overflow-y-auto ">
      <h1 className=" title py-5">Create Thread</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Captions..."
                    className="bg-main "
                    cols={50}
                    rows={20}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={pending}
            type="submit"
            className="w-full bg-primary-500"
          >
            {pending ? "Uploading..." : "Publish"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
