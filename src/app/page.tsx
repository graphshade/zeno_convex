import ChatHelp from "./components/chat/ChatHelp";
import ChatInputNew from "./components/chat/ChatInputNew";
import { Button } from "./components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

export default async function Home() {
  // const { prompt } = useContext(PromptContext);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-2">
      <div className="max-w-4xl  w-[min(90vw,750px)] flex flex-col items-center gap-5 mx-auto">
        <p className="text-[min(7vw,24px)] font-500 text-primary text-center">
          Hi! I am <span className="squiggly-underline">Zeno</span>, a data
          discovery bot . How can I help you?
        </p>
        <ChatInputNew />
        <p className=" text-sm text-slate-500 text-left self-start px-2">
          Reports by business unit
        </p>
        <ChatHelp />
      </div>
      <p className=" text-sm text-slate-500 px-2 fixed bottom-4">
        Zeno is an experimental AI from SmartOps.
        <Button variant="link" className="px-2 text-sm text-slate-500">
          <Link href="/about">Learn more</Link>
        </Button>
      </p>
    </main>
  );
}
