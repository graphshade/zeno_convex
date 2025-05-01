import React from "react";
import type { Metadata } from "next";
import FeatureForm from "@/app/components/feature/FeatureForm";

export const metadata: Metadata = {
  title: "New Feature | Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

const NewFeature = async () => {
  return (
    <>
      <section className="flex items-center justify-center px-5 md:mt-20">
        <h3 className="text-2xl md:text-3xl font-semi-bold text-center">
          New Feature Request
        </h3>
      </section>
      <section className="flex flex-col items-center justify-center mt-8 mx-5 md:max-w-[600px] md:mx-auto lg:max-w-full">
        <FeatureForm />
      </section>
    </>
  );
};

export default NewFeature;
