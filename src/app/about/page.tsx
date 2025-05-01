// import ChatHelp from "@/src/components/ChatHelp";
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-10 md:pt-25 overflow-auto">
      <article className="flex flex-col items-center mb-10 max-w-[1800px]">
        <div className="flex flex-col md:flex-row mb-10 md:mb-5 items-center ">
          <div>
            <Image
              src={"/meet_zen_squre.png"}
              height={200}
              width={200}
              alt=""
            />
          </div>
          <div className="flex flex-col item-center justify-content">
            <h1 className="text-5xl text-primary">Meet Zeno</h1>
            <h2 className="text-lg mt-3 text-primary">
              making data discovery fun
            </h2>
          </div>
        </div>
        <section className="mx-[10px] px-10 md:mx-[70px] lg:mx-[180px] xl:mx-[250px] 2xl:mx-[350px] md:text-lg mb-4">
          <h3 className="self-start font-bold">
            About Zeno: Your Intelligent Data Discovery Assistant
          </h3>
          <p className="mt-3">
            Welcome to Zeno, the conversational AI chatbot developed by the
            Smart Ops team to revolutionize how businesses interact with their
            data. Zeno is designed to help you discover, explore, and manage
            your business reports with ease, empowering you to make data-driven
            decisions faster than ever before.
          </p>
        </section>

        <section className="mx-[10px] px-10 md:mx-[70px] lg:mx-[180px] xl:mx-[250px] 2xl:mx-[350px] md:text-lg mb-4">
          <h3 className="self-start font-bold">What Zeno Can Do for You</h3>

          <p className="mt-3">
            Zeno is built to assist you in finding reports, particularly Power
            BI dashboards, with a focus on enhancing your data discovery
            experience. There are tons of reports out there and it can be
            daunting to find the report relevant to your business questions.
            Zeno improves the experience. It is your go to assitant to find
            reports.
            <br />
            <br />
            Key features include:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li className="mt-3">
              <span className="font-bold">Power BI Dashboard Discovery</span>:
              Zeno can help you locate and view specific Power BI dashboards or
              reports. Simply ask for the report you&apos;re looking for, and
              Zeno will find it quickly and seamlessly.
            </li>
            <li className="mt-3">
              <span className="font-bold">Conversational Interface</span>:
              Quickly find reports using natural conversational interace.
              Whether you&apos;re a new employee or an existing employee, Zeno
              makes it easy to find reports without needing to &quot;ping&quot;
              multiple people to find answers to your pressing business
              questions.
            </li>
            <li className="mt-3">
              <span className="font-bold">Report Management</span>: For business
              report developers, Zeno offers users the ability to add new
              reports you want share with others or edit existing ones to update
              there metadata. With intuitive commands, you can upload new
              reports or update outdated ones.
            </li>
          </ul>
        </section>

        <section className="mx-[10px] px-10 md:mx-[70px] lg:mx-[180px] xl:mx-[250px] 2xl:mx-[350px] md:text-lg mb-4">
          <h3 className="self-start font-bold">Powered by RAG and LLama3</h3>
          <p className="mt-3">
            Zeno leverages a RAG (Retrieve and Generate) setup, using the LLama3
            language model as its core engine. This setup allows Zeno to
            efficiently retrieve relevant data and generate human-like
            responses, making it easier for users to find what they need in a
            conversational format. The integration of RAG ensures that Zeno can
            pull the most relevant business reports from your data sources,
            enhancing both accuracy and efficiency.
          </p>
        </section>

        <section className="mx-[10px] px-10 md:mx-[70px] lg:mx-[180px] xl:mx-[250px] 2xl:mx-[350px] md:text-lg mb-4">
          <h3 className="self-start font-bold">Current Limitations:</h3>

          <p className="mt-3">
            While Zeno is a powerful tool for data discovery and report
            management, there are a few limitations to keep in mind:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li className="mt-3">
              <span className="font-bold">Answering business questions</span>:
              Zeno is a report discovery bot. That is it only enables you to
              find reports. It doesn&apos;t have access to the content of the
              business report in order to answer busienss questions related to
              that report.
            </li>
            <li className="mt-3">
              <span className="font-bold">Report access management</span>: Zeno
              doesn&apos;t manage access to the reports. If you don&apos;t have
              access to the report Zeno pointed you to, contact the owner of the
              report to grant you access.
            </li>
            <li className="mt-3">
              <span className="font-bold">May hallucinate</span>: Zeno at
              it&apos;s core is a large language model application making API
              calls to a fine-tuned LLama3 model. While Zeno uses context
              retrival to improve correctness of its reponses, it is not 100%
              accurate.
            </li>
          </ul>

          <p className="mt-3">
            At Smart Ops, we are committed to continually evolving Zeno to
            enhance its capabilities and deliver a superior user experience. As
            we expand the chatbot&apos;s functionality, our goal is to make data
            discovery and management as intuitive and efficient as possible.
            <br />
            We hope Zeno becomes a valuable assistant in your data-driven
            journey!
          </p>
        </section>
      </article>
    </main>
  );
}
