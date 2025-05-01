"use client";

import React, { useEffect } from "react";
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
import { reportFormSchema } from "@/lib/validators";
import { z } from "zod";
import FormDropdown from "./FormDropDown";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Doc } from "../../../../convex/_generated/dataModel";

type FormProps = {
  type: "create" | "update";
  report?: Doc<"reports">;
};

const ReportForm = ({ type, report }: FormProps) => {
  const createNewReport = useMutation(api.reports.createReport);
  const updateReport = useMutation(api.reports.updateReport);

  const router = useRouter();

  const form = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportTitle: "",
      businessUnit: "Global Supply Chain (GSC)",
      reportOwner: "",
      briefDescription: "",
      detailedDescription: "",
      reportUrl: "",
    },
  });

  useEffect(() => {
    if (report) {
      form.reset(report);
    }
  }, [form, report]);

  async function onSubmit(values: z.infer<typeof reportFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const context: string = `The name of this report is ${values.reportTitle}. 
    The report is developed and owned by   ${values.reportOwner}.
    The report belongs to and developed for the  ${values.businessUnit} business unit.
    A brief description about this report is  ${values.briefDescription}.
    A detailed description about this report is  ${values.detailedDescription}.
    A link to find this report is  ${values.reportUrl}.   
    `;
    if (type === "create") {
      const reportId = await createNewReport({
        reportTitle: values.reportTitle,
        businessUnit: values.businessUnit,
        reportOwner: values.reportOwner,
        briefDescription: values.briefDescription,
        detailedDescription: values.detailedDescription,
        reportUrl: values.reportUrl,
        context: context,
      });

      if (reportId) {
        toast.success("Report Added");
        form.reset();
        router.push("/report");
      } else {
        toast.error("Report not created. Retry");
      }
    }

    if (type === "update" && report) {
      const reportId = await updateReport({
        reportId: report._id,
        reportTitle: values.reportTitle,
        businessUnit: values.businessUnit,
        reportOwner: values.reportOwner,
        briefDescription: values.briefDescription,
        detailedDescription: values.detailedDescription,
        reportUrl: values.reportUrl,
        context: context,
      });

      if (reportId) {
        toast.success("Report updated");
        form.reset();
        router.push("/report");
      } else {
        toast.error("Report not updated. Retry");
      }
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
            name="reportTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Report title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="the title of your report"
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
            name="businessUnit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Business unit</FormLabel>
                <FormControl>
                  <FormDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportOwner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Report owner</FormLabel>
                <FormControl>
                  <Input
                    placeholder="the report owners or developers"
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
            name="reportUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md">Report URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="link to the report"
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
                  Brief report description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="brief description of what the report is about"
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
                  Detailed description of report
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="detailed description of the report including purpose, audience, metric/KPI description and definitions"
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

export default ReportForm;
