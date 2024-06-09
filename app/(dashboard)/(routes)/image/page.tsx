"use client";

import * as z from "zod";
import { Download, ImageIcon, MessageSquare } from "lucide-react";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import Image from "next/image";

const ImageGeneration = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Image Prompt is required.",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
  });

  const amountOptions = [
    {
      value: "1",
      label: "1 Photo",
    },
    {
      value: "2",
      label: "2 Photo",
    },
    {
      value: "3",
      label: "3 Photo",
    },
    {
      value: "4",
      label: "4 Photo",
    },
  ];

  const resolutionOptions = [
    {
      value: "256x256",
      label: "256x256",
    },
    {
      value: "512x512",
      label: "512x512",
    },
    {
      value: "102x102",
      label: "102x102",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "2",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        values,
      });

      console.log(response, "urlsurlsurls");

      setImages(response.data);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    console.log(images, "**********");
  }, [images]);

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="text-pink-500/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-4"
                        placeholder="A picture of horse in swiss alps"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="num_outputs"
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}

              <Button
                className="col-span-12 lg:col-span-2 bg-blue-600 w-fit mt-4 rounded-lg flex justify-end"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <div key={src} className="rounded-lg overflow-square">
                <div className="relative aspect-square">
                  <Image src={src?.url} fill alt="Image" />
                </div>
                <div className="p-2">
                  <Button
                    className="w-full bg-blue-600"
                    onClick={() => window.open(src?.url)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
