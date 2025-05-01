// import ReportForm from "@/app/components/Report/ReportForm";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import type { Metadata } from "next";
import UpdateForm from "@/app/components/Report/UpdateForm";

export const metadata: Metadata = {
  title: "Edit Report | Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

const AddReport = async ({ params }: { params: Promise<{ id: Id<"reports"> }> }) => {
    const { id } = await params;
  return (
    <>
      <section className="flex items-center justify-center px-5 md:mt-20">
        <h3 className="text-2xl md:text-3xl font-semi-bold text-center">
          Edit Report {id}
        </h3>
      </section>
      <section className="flex flex-col items-center justify-center mt-8 mx-5 md:max-w-[600px] md:mx-auto lg:max-w-full">
        <UpdateForm id={id}/>
      {/* <ReportForm type="update"/> */}
      </section>
    </>
  );
};

export default AddReport;
