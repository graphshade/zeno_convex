"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { featureFormSchema } from "@/lib/validators";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FeatureForm = () => {
  const createNewFeatureRequest = useMutation(
    api.features.createFeatureRequest
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof featureFormSchema>>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      name: "",
      email: "",
      briefDescription: "",
      detailedDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof featureFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const formID = await createNewFeatureRequest({
      requesterName: values.name,
      requesterEmail: values.email,
      featureSummary: values.briefDescription,
      featureDescription: values.detailedDescription,
    });

    if (formID) {
      toast.success("New request submitted");
      form.reset();
      router.push("/");
    } else {
      toast.error("Request not created. Retry");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 lg:w-[700px]"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your first and last name"
                    {...field}
                    className="lg:text-lg input-field placeholder:text-lg focus:text-lg h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your email"
                    {...field}
                    className="lg:text-lg input-field placeholder:text-lg focus:text-lg h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="briefDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">
                  Summary of feature request
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="brief description of what the feature is about"
                    {...field}
                    className="lg:text-lg textarea rounded-2xl placeholder:text-lg focus:text-lg max-h-10 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detailedDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">
                  Detailed description of feature
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="detailed description of the feature including the problem it solves and business benefit or value proposition"
                    {...field}
                    className="lg:text-lg textarea rounded-2xl h-50 placeholder:text-lg focus:text-lg  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="h-12 text-lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          {form.formState.isSubmitting ? "Submiting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default FeatureForm;
