"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

const FormSchema = z.object({
  ttlSeconds: z.number().min(0).max(86400),
});

export function InputForm(props: {
  className: string;
  onChange?: (val: number) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ttlSeconds: 0,
    },
  });

  form.register("ttlSeconds", {
    onChange: (value: ChangeEvent<HTMLInputElement>) => {
      console.log("TTL Changed", value.target.value);
      props.onChange && props.onChange(Number(value.target.value));
    },
  });

  return (
    <Form {...form}>
      <form className={cn(props.className, "space-y-6")}>
        <FormField
          control={form.control}
          name="ttlSeconds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Clock /> TTL Seconds
              </FormLabel>
              <FormControl className="mx-auto w-64">
                <Input
                  className="hover:shadow-red-300 focus:border-2 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This sets the responses cache for {field.value} seconds.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
