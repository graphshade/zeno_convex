import ReportForm from "@/app/components/Report/ReportForm";
import React from "react";

const CreateReport = () => {
  return (
    <>
      <section className="flex items-center justify-center px-5 md:mt-20">
        <h3 className="text-2xl md:text-3xl font-semi-bold text-center">
          Add new report
        </h3>
      </section>
      <section className="flex flex-col items-center justify-center mt-8 mx-5 md:max-w-[600px] md:mx-auto lg:max-w-full">
      <ReportForm type="create"/>
      </section>
    </>
  );
};

export default CreateReport;
