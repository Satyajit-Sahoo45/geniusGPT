"use client";

import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { Heading } from "../../../../components/Heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Button } from "../../../../components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Empty } from "../../../../components/Empty";
import { Loader } from "../../../../components/Loader";
import { BoatAvatar } from "../../../../components/BoatAvatar";
import { UserAvatar } from "../../../../components/UserAvatar";

const Conversation = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((prevData) => [...prevData, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <Heading
        title="Conversation"
        description="Start Conversation"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="text-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid-cols-12 gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Message"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 bg-blue-600 w-full"
                disabled={isLoading}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  message.user === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted "
                }`}
              >
                {message.role === "user" ? <UserAvatar /> : <BoatAvatar />}

                <p className="text-sm text-white">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
